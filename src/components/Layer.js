import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
	DotsVerticalIcon,
	MenuIcon,
	PlusCircleIcon,
	PuzzleIcon,
} from '@heroicons/react/solid'
import { useHistory, useLocation } from 'react-router-dom'

import classNames from '../util/classNames'

const Layer = ({
	layer,
	removeLayer,
	handleSetBreadcrumb,
	setSelectedLayer,
	setSelectedTraits,
	setTraitModalOpen,
	setTraitPanelOpen,
}) => {
	const history = useHistory()
	const location = useLocation()

	return (
		<Disclosure>
			{({ open }) => (
				<div className="px-4 py-4 flex items-center sm:px-6">
					<div className="min-w-0 flex-1 sm:flex sm:items-center">
						<MenuIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
						<div className="ml-5 truncate">
							<div className="flex text-sm">
								<p className="font-medium text-blue-600 truncate">{layer.name}</p>
							</div>
							<div className="mt-2 flex">
								<div className="flex items-center text-sm text-gray-500">
									<PuzzleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									<p>
										{layer.traits.length} traits
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex ml-5 flex-shrink-0 items-center">
						<button
							type="button"
							className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => {
								setSelectedLayer(layer)
								setTraitModalOpen(true)
							}}
						>
							<PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
								Add Trait(s)
							</button>
						<button
							type="button"
							className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => {
								setSelectedLayer(layer)
								setSelectedTraits(layer.traits)
								handleSetBreadcrumb(
									{ name: layer.name, href: `${location.pathname}/${layer.id}/trait`, current: false }, // href is not used or necesssary here
								)
								history.push(`${location.pathname}/${layer.id}/trait`)
							}}
						>
							<PuzzleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
							Traits
						</button>

						<Menu as="div" className="ml-3 relative">
							<div>
								<Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									<span className="sr-only">Open user menu</span>
									<DotsVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
									<Menu.Item>
										{({ active }) => (
											<div
												className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
											>
												Edit
											</div>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<div
												className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
												onClick={() => removeLayer(layer.id)}
											>
												Delete
											</div>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
					<Disclosure.Panel className="sm:hidden">
						<div className="pt-4 pb-3 border-t border-gray-200">
							<div className="mt-3 space-y-1">
								<div
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
								>
									Edit
								</div>
								<div
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
								>
									Delete
								</div>
							</div>
						</div>
					</Disclosure.Panel>
				</div>
			)}
		</Disclosure>
	)
}

export default Layer