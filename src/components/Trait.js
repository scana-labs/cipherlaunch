import { Fragment, useState } from 'react'
import { Listbox, Menu, Transition } from '@headlessui/react'
import {
	CheckIcon,
	DotsVerticalIcon,
	SelectorIcon
} from '@heroicons/react/solid'

import './Trait.css'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const colors = ['blue', 'green', 'yellow']

const Trait = ({ layers, currentLayer, moveTrait, removeTrait, trait }) => {
	const [selected, setSelected] = useState(currentLayer || null)

	const handleChange = (newSelected) => {
		console.log('Move Trait', newSelected)
		try {
			setSelected(newSelected)
			moveTrait(trait.id, newSelected.id, currentLayer.id)
		}
		catch (e) {
			console.log('Unable to move trait:', e)
		}
	}

	return (
		<div key={trait.id} className="group">
			<div className="aspect-w-16 aspect-h-16">
			{trait.image_url ?
				<img
					src={trait.image_url}
					className="rounded-lg overflow-hidden"
					alt="trait"
				/>
				:
				<div className={`bg-${colors[Math.floor(Math.random() * (colors.length - 1))]}-400 rounded-lg overflow-hidden`} />}
			</div>
			<div className="w-full flex items-center justify-between mt-3">
				<div>
					<p className="mt-4 text-lg font-medium text-gray-900">{trait.name}</p>
					<h3 className="mt-1 text-sm text-gray-700">Rarity: {trait.rarity}</h3>
				</div>
				<Listbox value={selected} onChange={handleChange}>
					<div className="w-40">
						<Listbox.Label className="block text-sm font-medium text-gray-700">Category</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
								<span className="block truncate">{selected?.name || 'Default layer'}</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>

							<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{layers.map((cat) => (
										<Listbox.Option
											key={cat.id}
											className={({ active }) =>
												classNames(
													active ? 'text-white bg-blue-600' : 'text-gray-900',
													'cursor-default select-none relative py-2 pl-3 pr-9'
												)
											}
											value={cat}
										>
											{({ selected, active }) => (
												<>
													<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
														{cat.name}
													</span>

													{selected ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-blue-600',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															)}
														>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</div>
				</Listbox>
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
						<Menu.Items className="z-100 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
										onClick={() => removeTrait(trait.id, currentLayer.id)}
									>
										Delete
									</div>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	)
}

export default Trait