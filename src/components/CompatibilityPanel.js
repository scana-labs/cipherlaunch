import { Fragment, useEffect, useRef } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import { API, graphqlOperation } from 'aws-amplify'

import { listIncompatibilitiesUnderProject } from '../graphql/queries';
import { createIncompatibility, deleteIncompatibility } from '../graphql/mutations'
import Spinner from './Spinner'

const CompatibilityPanel = ({
	currentLayer,
	currentTrait,
	layers,
	panelOpen,
	projectId,
	setPanelOpen,
}) => {
	const cancelButtonRef = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const [filters, setFilters] = useState([])
	const [traitPairsToAdd, setTraitPairsToAdd] = useState({})
	const [traitPairsToDelete, setTraitPairsToDelete] = useState({})
	const [incompatibilities, setIncompatibilities] = useState([])

	const fetchIncompatibilities = async () => {
		setIsLoading(true)

		try {
			const incompats = await API.graphql(graphqlOperation(listIncompatibilitiesUnderProject, { project_id: projectId }))

			console.log('Fetched Incompatibilities', incompats)

			setIncompatibilities(incompats?.data?.listIncompatibilitiesUnderProject || [])
		}
		catch (e) {
			console.log('Error fetching incompatibilities:', e)
		}
		finally {
			setIsLoading(false)
		}
	}

	const handleCheckboxChange = (e, trait) => {
		const traitIds = [currentTrait.id, trait.id]
		traitIds.sort() // Guarantee ids are always in the same order

		const compatibilityKey = traitIds.join(':')

		const addTraitPairs = { ...traitPairsToAdd }
		const deleteTraitPairs = { ...traitPairsToDelete }

		// Checkbox is checked
		if (e.target.checked) {
			if (!addTraitPairs.hasOwnProperty(compatibilityKey) && incompatibilities.filter(compat => compat.incompatibility_id === compatibilityKey).length === 0) {
				addTraitPairs[compatibilityKey] = {
					projectId,
					compatibilityId: compatibilityKey,
				}
			}
			if (deleteTraitPairs.hasOwnProperty(compatibilityKey)) {
				delete deleteTraitPairs[compatibilityKey]
			}
		}
		else { // Checkbox is unchecked
			if (!deleteTraitPairs.hasOwnProperty(compatibilityKey) && incompatibilities.filter(compat => compat.incompatibility_id === compatibilityKey).length > 0) {
				deleteTraitPairs[compatibilityKey] = {
					projectId,
					compatibilityId: compatibilityKey,
				}
			}
			if (addTraitPairs.hasOwnProperty(compatibilityKey)) {
				delete addTraitPairs[compatibilityKey]
			}
		}

		setTraitPairsToAdd(addTraitPairs)
		setTraitPairsToDelete(deleteTraitPairs)
	}

	const saveCompatibilities = async () => {
		console.log('New incompats', traitPairsToAdd, traitPairsToDelete)

		try {
			// TODO: Check errors and retry
			const uploadedTraits = await Promise.all(Object.keys(traitPairsToAdd).map(async k => {
				const t = traitPairsToAdd[k]
				const ids = t.compatibilityId.split(':')

				if (ids.length !== 2 || !ids[0] || !ids[1]) {
					throw new Error('Invalid compatibility id', t.compatibilityId)
				}

				const input = {
					trait_1_id: ids[0],
					trait_2_id: ids[1],
					project_id: projectId,
					incompatibility_id: t.compatibilityId,
				}

				return API.graphql(graphqlOperation(createIncompatibility, { createIncompatibilityInput: {
					...input
				}}))
			}))

			const deletedTraits = await Promise.all(Object.keys(traitPairsToDelete).map(async k => {
				const t = traitPairsToDelete[k]
				return API.graphql(graphqlOperation(deleteIncompatibility, { incompatibility_id: t.compatibilityId }))
			}))

			setTraitPairsToAdd({})
			setTraitPairsToDelete({})
			await fetchIncompatibilities() // TODO: Do this client side without a request
		}
		catch (e) {
			console.log('Error saving/deleting incompatibilities', e)
		}
	}

	useEffect(() => {
		fetchIncompatibilities()
	}, [])

	useEffect(() => {
		// TODO: Check currentLayer.id and currentTrait.id
		setFilters(layers
			.filter(l => l.id !== currentLayer.id)
			.map(l => ({
				id: l.id,
				name: l.name,
				traits: l.traits.map(t => {
					const traitIds = [currentTrait.id, t.id]
					traitIds.sort() // Guarantee ids are always in the same order

					const compatibilityKey = traitIds.join(':')

					return ({
						id: t.id,
						label: t.name,
						checked: incompatibilities.some(c => c.incompatibility_id === compatibilityKey) || false, // TODO: Make compatibilities map instead
					})
				}),
			})))
	}, [layers, incompatibilities, currentLayer.id, currentTrait.id])

	return (
		<Transition.Root show={panelOpen} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setPanelOpen}>
				<div className="absolute inset-0 overflow-hidden">
					<Dialog.Overlay className="absolute inset-0" />

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16" style={{ zIndex: 1000 }}>
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-3xl">
								<div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
									<div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
										<div className="mt-16 px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">Layers</Dialog.Title>
												<div className="ml-3 h-7 flex items-center">
													<button
														type="button"
														className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
														onClick={() => setPanelOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<XIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										{isLoading && <Spinner />}
										{!isLoading && <main className="px-4 sm:px-6 lg:px-8">
											{filters.map((layers) => (
												<Disclosure as="div" key={layers.id} className="border-b border-gray-200 py-6">
													{({ open }) => (
														<>
															<h3 className="-my-3 flow-root">
																<Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
																	<span className="font-medium text-gray-900">{layers.name}</span>
																	<span className="ml-6 flex items-center">
																		{open ? (
																			<MinusSmIcon className="h-5 w-5" aria-hidden="true" />
																		) : (
																				<PlusSmIcon className="h-5 w-5" aria-hidden="true" />
																			)}
																	</span>
																</Disclosure.Button>
															</h3>
															<Disclosure.Panel className="pt-6">
																<div className="space-y-4">
																	{layers.traits.map((trait, traitIdx) => (
																		<div key={`compat-${trait.id}`} className="flex items-center">
																			<input
																				id={`filter-${layers.id}-${traitIdx}`}
																				name={`${layers.id}[]`}
																				defaultValue={trait.id}
																				type="checkbox"
																				defaultChecked={trait.checked}
																				className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
																				onChange={(e) => handleCheckboxChange(e, trait)}
																			/>
																			<label
																				htmlFor={`filter-${layers.id}-${traitIdx}`}
																				className="ml-3 text-sm text-gray-600"
																			>
																				{trait.label}
																			</label>
																		</div>
																	))}
																</div>
															</Disclosure.Panel>
														</>
													)}
												</Disclosure>
											))}
										</main>}
										<div className="flex mt-auto ml-auto">
											<button
												type="button"
												className="mx-2 w-40 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
												onClick={() => {
													setPanelOpen(false)
												}}
												ref={cancelButtonRef}
											>
												Cancel
											</button>
											<button
												type="button"
												className="mx-2 w-40 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
												onClick={() => {
													saveCompatibilities()
												}}
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default CompatibilityPanel 