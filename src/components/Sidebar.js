import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { HomeIcon, XIcon } from '@heroicons/react/outline'
import {
	SearchIcon,
	SelectorIcon,
} from '@heroicons/react/solid'

import { useAuth } from '../auth'
import MenuItems from './MenuItems'


const navigation = [
	{ name: 'Home', href: '#', icon: HomeIcon, current: true },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const { user } = useAuth()

	return (
		<div className="fixed h-screen flex overflow-hidden bg-white">
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										type="button"
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">Close sidebar</span>
										<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</Transition.Child>
							<div className="mt-5 flex-1 h-0 overflow-y-auto">
								<nav className="px-2">
									<div className="space-y-1">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
													'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
												)}
												aria-current={item.current ? 'page' : undefined}
											>
												<item.icon
													className={classNames(
														item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
														'mr-3 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										))}
									</div>
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden lg:flex lg:flex-shrink-0">
				<div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
					<div className="flex items-center flex-shrink-0 px-6">
						<div className="text-xl text-red-500">Cipherlaunch</div>
					</div>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="h-0 flex-1 flex flex-col overflow-y-auto">
						{/* User account dropdown */}
						<Menu as="div" className="px-3 mt-6 relative inline-block text-left">
							<div>
								<Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
									<span className="flex w-full justify-between items-center">
										<span className="flex min-w-0 items-center justify-between space-x-3">
											<span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
												<span className="text-xl font-medium leading-none text-white">{user.username[0]}</span>
											</span>
											<span className="flex-1 flex flex-col min-w-0">
												<span className="text-gray-900 text-sm font-medium truncate">@{user.username}</span>
											</span>
										</span>
										<SelectorIcon
											className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</span>
								</Menu.Button>
							</div>
							<MenuItems />
						</Menu>
						{/* Sidebar Search */}
						<div className="px-3 mt-5">
							<label htmlFor="search" className="sr-only">
								Search
				</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div
									className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
									aria-hidden="true"
								>
									<SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
								</div>
								<input
									type="text"
									name="search"
									id="search"
									className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
									placeholder="Search"
								/>
							</div>
						</div>
						{/* Navigation */}
						<nav className="px-3 mt-6">
							<div className="space-y-1">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
											'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										<item.icon
											className={classNames(
												item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
												'mr-3 flex-shrink-0 h-6 w-6'
											)}
											aria-hidden="true"
										/>
										{item.name}
									</a>
								))}
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sidebar