import { Fragment } from 'react'
import { Auth } from 'aws-amplify';
import { Menu, Transition } from '@headlessui/react'

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

const MenuItems = () => (
	<Transition
		as={Fragment}
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
			<div className="py-1">
				<Menu.Item>
					{({ active }) => (
						<a
							href="/profile"
							className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
							)}
						>
							View profile
						</a>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<a
							href="/settings"
							className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
							)}
						>
							Settings
						</a>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<a
							href="/notifications"
							className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
							)}
						>
							Notifications
						</a>
					)}
				</Menu.Item>
			</div>
			<div className="py-1">
				<Menu.Item>
					{({ active }) => (
						<a
							href="/support"
							className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
							)}
						>
							Support
						</a>
					)}
				</Menu.Item>
			</div>
			<div className="py-1">
				<Menu.Item>
					{({ active }) => (
						<a
							href="/"
							className={classNames(
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'block px-4 py-2 text-sm'
							)}
							onClick={signOut}
						>
							Logout
						</a>
					)}
				</Menu.Item>
			</div>
		</Menu.Items>
	</Transition>
)

export default MenuItems