import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import './Trait.css'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const colors = ['blue', 'green', 'yellow']

const Trait = ({ categories, currentCategory, moveTrait, trait }) => {
	const [selected, setSelected] = useState(currentCategory || null)

	const handleChange = (newSelected) => {
		console.log('Move Trait', newSelected)
		try {
			setSelected(newSelected)
			moveTrait(trait.id, newSelected.id, currentCategory.id)
		}
		catch (e) {
			console.log('Unable to move trait:', e)
		}
	}

	return (
		<div key={trait.id} className="group">
			<div className={`w-full h-40 bg-${colors[trait.id % (colors.length)]}-400 rounded-lg overflow-hidden`} />
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
									{categories.map((cat) => (
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
			</div>
		</div>
	)
}

export default Trait