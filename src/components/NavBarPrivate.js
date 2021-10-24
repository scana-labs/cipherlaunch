import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { DEFAULT_PROJECTS_ROUTE, DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes'
import { useAuth } from '../auth'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const NAV_BAR_ITEMS = {
	projects: 0,
	collections: 1,
}

const NavBarPrivate = () => {
	const [selected, setSelected] = useState(NAV_BAR_ITEMS.projects)
	const { user } = useAuth()

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex">
								<div className="flex-shrink-0 flex items-center">
									<div className="text-xl text-red-500">cipherlaunch</div>
								</div>
								<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
									{/* Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link
										to={DEFAULT_PROJECTS_ROUTE}
										className={`${selected === NAV_BAR_ITEMS.projects ? 'border-blue-500' : ''} hover:border-gray-300 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
										onClick={() => setSelected(NAV_BAR_ITEMS.projects)}
									>
										Projects	
									</Link>
									<Link
										to={`${DEFAULT_PROJECTS_ROUTE}${DEFAULT_COLLECTIONS_ROUTE}`}
										className={`${selected === NAV_BAR_ITEMS.collections ? 'border-blue-500' : ''} border-transparent text-gray-900 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
										onClick={() => setSelected(NAV_BAR_ITEMS.collections)}
									>
										Collections
									</Link>
								</div>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								{/* Profile dropdown */}
								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
											<span className="sr-only">Open user menu</span>
											<span
												className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
											>
												<span className="text-xl font-medium leading-none text-white">{user.username[0] || ''}</span>
											</span>
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
														Your Profile
													</div>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<div
														className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
													>
														Settings
													</div>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<div
														className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
														onClick={signOut}
													>
														Sign out
													</div>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{/* Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							<Link
								to={DEFAULT_PROJECTS_ROUTE}
								className={`${selected === NAV_BAR_ITEMS.projects ? 'bg-blue-50 border-blue-500 text-blue-700' : ''} block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700`}
								onClick={() => setSelected(NAV_BAR_ITEMS.projects)}
							>
								Projects
							</Link>
							<Link
								to={DEFAULT_COLLECTIONS_ROUTE}
								className={`${selected === NAV_BAR_ITEMS.projects ? 'bg-blue-50 border-blue-500 text-blue-700' : ''} border-transparent text-base hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
								onClick={() => setSelected(NAV_BAR_ITEMS.collections)}
							>
								Collections
							</Link>
						</div>
						<div className="pt-4 pb-3 border-t border-gray-200">
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									<span
										className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
									>
										<span className="text-xl font-medium leading-none text-white">{user.username[0] || ''}</span>
									</span>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">Tom Cook</div>
									<div className="text-sm font-medium text-gray-500">tom@example.com</div>
								</div>
							</div>
							<div className="mt-3 space-y-1">
								<div
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
								>
									Your Profile
								</div>
								<div
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
								>
									Settings
								</div>
								<div
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
									onClick={signOut}
								>
									Sign out
								</div>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default NavBarPrivate