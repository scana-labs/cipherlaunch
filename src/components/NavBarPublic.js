import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
} from '@heroicons/react/outline'

import { DEFAULT_LOGIN_ROUTE, DEFAULT_SIGNUP_ROUTE } from '../constants/Routes'
import { useAuth } from '../auth'

const NavBarPublic = () => {
	const location = useLocation();
	const { user } = useAuth();

	console.log('USER', user, !!user)

	return (
		<Popover className="relative bg-white">
			<div className="px-4 sm:px-6">
				<div className="flex justify-between items-center py-6 md:space-x-10">
					<div className="-mr-2 -my-2 md:hidden">
						<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
						<span className="sr-only">Open menu</span>
						<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</Popover.Button>
					</div>
					<Link to="/">
						<p className="text-2xl text-red-500">🚀 Cipher Launch 🚀</p>
					</Link>
					{
						user ? <div>
							<AmplifySignOut buttonText="Sign out"></AmplifySignOut>
						</div>
						:
						!location.pathname.includes('login') && <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
							<Link
								to={DEFAULT_LOGIN_ROUTE}
								className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
							>
								Sign in
							</Link>
							<Link
								to={DEFAULT_SIGNUP_ROUTE}
								className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
							>
								Sign up
							</Link>
						</div>
					}
				</div>
			</div>

			<Transition
				as={Fragment}
				enter="duration-200 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-100 ease-in"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
					<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
						<div className="py-6 px-5 space-y-6">
							{!location.pathname.includes('login') && <div>
								<Link
									to={DEFAULT_SIGNUP_ROUTE}
									className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
								>
									Sign up
								</Link>
								<p className="mt-6 text-center text-base font-medium text-gray-500">
									Existing customer?{' '}
									<Link
										to={DEFAULT_LOGIN_ROUTE}
										className="text-indigo-600 hover:text-indigo-500"
									>
									Sign in
									</Link>
								</p>
							</div>}
						</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	)
}

export default NavBarPublic