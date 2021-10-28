import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
	DotsVerticalIcon,
} from '@heroicons/react/solid'

import classNames from '../util/classNames'

const CollectionRow = ({ collection, setCurrentCollection }) => {
	const location = useLocation()
	return (
		<Disclosure>
			{({ open }) => (
				<div className="bg-white mb-3 cursor-pointer px-4 py-4 w-full flex justify-between items-center border border-gray-200 rounded block hover:bg-gray-50 sm:px-6">
					<div className="min-w-0 flex-1 sm:flex sm:items-center">
						<div className="ml-5 truncate">
							<Link
								to={`${location.pathname}/${collection.collection_id}/tokens`}
								onClick={() => setCurrentCollection(collection)}
							>
								<div className="flex text-sm">
									<p className="font-medium text-blue-600 truncate">{collection.name}</p>
								</div>
							</Link>
						</div>
					</div>
					<div className="flex ml-5 flex-shrink-0 items-center">
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

export default CollectionRow