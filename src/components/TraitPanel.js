import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import Trait from './Trait'

const TraitPanel = ({
	layers,
	moveTrait,
	removeTrait,
	selectedLayer,
	setTraitModalOpen,
	setTraitPanelOpen,
	traitPanelOpen,
	traits,
}) => {
	return (
		<Transition.Root show={traitPanelOpen} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setTraitPanelOpen}>
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
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">{selectedLayer.name} Traits</Dialog.Title>
												<div className="ml-3 h-7 flex items-center">
													<button
														type="button"
														className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
														onClick={() => setTraitPanelOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<XIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div className="mt-6 relative flex flex-wrap justify-center">
											{traits.length > 0 ?
												traits.map((t, index) => (
													<div className="m-2 w-full md:w-1/2" key={`trait-${index}`}>
														<Trait key={index} layers={layers} currentLayer={selectedLayer} moveTrait={moveTrait} removeTrait={removeTrait} trait={t} />
													</div>
												))
												:
												<p>No Traits! Add some by clicking "Add Trait" for the corresponding layer.</p>}
										</div>
									</div>
									{/* TODO: Look into adding this. Causes focus call stack to exceed max
									 <div className="flex-shrink-0 px-4 py-4 flex justify-end">
										<button
											type="button"
											className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											onClick={() => setTraitPanelOpen(false)}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											onClick={() => setTraitModalOpen(true)}
										>
											Add Trait
										</button>
									</div> */}
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default TraitPanel