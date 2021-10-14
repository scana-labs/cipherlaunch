import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { DEFAULT_HOME_ROUTE } from '../constants/Routes'

import Trait from './Trait'

const EditProject = () => {
	const [categories, setCategories] = useState([{id: -1, name: 'None', traits: []}])
	const sumReducer = (previousValue, currentValue) => previousValue + currentValue;
	const productReducer = (previousValue, currentValue) => previousValue * currentValue;


	const addTrait = () => {
		const name = document.getElementById('trait-name').value
		const rarity = document.getElementById('trait-rarity').value
		const totalTraits = categories.map(c => c.traits.length).reduce(sumReducer, 0)

		if (name && rarity) {
			const newTrait = {
				id: totalTraits + 1,
				name,
				rarity,
			}
			const newCategories = [...categories]

			// Add trait to none category
			newCategories.filter(c => c.id === -1)[0].traits.push(newTrait)

			setCategories(newCategories)

			document.getElementById('trait-name').value = ''
			document.getElementById('trait-rarity').value = ''
		}
	}

	const addCategory = () => {
		const name = document.getElementById('category-name').value

		if (name) {
			const newCategory = {
				id: categories.length + 1,
				name,
				traits: [],
			}

			setCategories([...categories, newCategory])

			document.getElementById('category-name').value = ''
		}
	}

	const moveTrait = (traitId, categoryId) => {
		const newCategories = [...categories]

		const newNoneTraits = [...newCategories.filter(c => c.id === -1)[0].traits]
		const trait = newNoneTraits.filter(t => t.id === traitId)[0]
		const traitIndex = newNoneTraits.indexOf(trait)

		if (traitIndex > -1) {
			newNoneTraits.splice(traitIndex, 1)

			newCategories.filter(c => c.id === -1)[0].traits = newNoneTraits 
			newCategories.filter(c => c.id === categoryId)[0].traits.push(trait)

			setCategories(newCategories)
		}
	}

	return (
		<div className="flex flex-col w-0 flex-1 m-5">
			<Link className="underline hover:text-blue-600" to={DEFAULT_HOME_ROUTE}>Back to Projects</Link>
			<div className="mb-5">
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Traits</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{categories.map(c => c.traits.length).reduce(sumReducer, 0)}</dd>
					</div>
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{categories.length - 1}</dd>
					</div>
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Tokens</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{categories.filter(c => c.id !== -1).map(c => c.traits.length).reduce(productReducer, 1)}</dd>
					</div>
				</dl>
			</div>
			{/* Uncategorized traits */}
			<Disclosure as="div" defaultOpen>
				{({ open }) => (
					<>
						<div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Uncategorized Traits</h3>
							<div className="mt-3 sm:mt-0 sm:ml-4">
								<label htmlFor="mobile-search-candidate" className="sr-only">
									Search
								</label>
								<label htmlFor="desktop-search-candidate" className="sr-only">
									Search
								</label>
								<div className="flex rounded-md">
									<div className="relative flex-grow focus-within:z-10">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										</div>
										<input
											type="text"
											name="mobile-search-candidate"
											id="mobile-search-candidate"
											className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
											placeholder="Search"
										/>
										<input
											type="text"
											name="desktop-search-candidate"
											id="desktop-search-candidate"
											className="hidden focus:ring-blue-500 focus:border-blue-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
											placeholder="Search"
										/>
									</div>
									<button
										type="button"
										className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									>
										<SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										<span className="ml-2">Sort</span>
										<ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									</button>
									<Disclosure.Button className="group relative flex justify-between items-center text-left">
										<span className="ml-6 flex items-center">
											{open ? (
												<MinusSmIcon
													className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
													aria-hidden="true"
												/>
											) : (
													<PlusSmIcon
														className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												)}
										</span>
									</Disclosure.Button>
								</div>
							</div>
						</div>
						<Disclosure.Panel as="div" className="max-w-2xl mx-auto py-8 px-2 lg:max-w-7xl">
							<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
								<div className="group shadow rounded p-5 h-60">
									<div className='w-full h-20 bg-white rounded-lg overflow-hidden'>
										<label className="block text-sm font-medium text-gray-700">
											Name
										</label>
										<div className="mt-1">
											<input
												type="text"
												name="trait-name"
												id="trait-name"
												className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
												placeholder="Awesome trait"
											/>
										</div>
									</div>
									<div className='w-full h-20 bg-white rounded-lg overflow-hidden'>
										<label className="block text-sm font-medium text-gray-700">
											Rarity
										</label>
										<div className="mt-1">
											<input
												type="text"
												name="trait-rarity"
												id="trait-rarity"
												className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
												placeholder="0.01"
											/>
										</div>
									</div>
									<button
										type="button"
										className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										onClick={addTrait}
									>
										Create new trait
									</button>
								</div>
								{/* FIXME: The none cateogory will not always be guaranteed to be the first in the list */}
								{categories[0].traits.map((trait) => (
									<Trait trait={trait} categories={categories} moveTrait={moveTrait} />
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
			{/* Categories */}
			<Disclosure as="div" className='mt-5' defaultOpen>
				{({ open }) => (
					<>
						<div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
							<h3 className="text-lg leading-6 font-medium text-gray-900">Categories</h3>
							<div className="mt-3 sm:mt-0 sm:ml-4">
								<label htmlFor="mobile-search-candidate" className="sr-only">
									Search
								</label>
								<label htmlFor="desktop-search-candidate" className="sr-only">
									Search
								</label>
								<div className="flex rounded-md">
									<div className="relative flex-grow focus-within:z-10">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										</div>
										<input
											type="text"
											name="mobile-search-candidate"
											id="mobile-search-candidate"
											className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
											placeholder="Search"
										/>
										<input
											type="text"
											name="desktop-search-candidate"
											id="desktop-search-candidate"
											className="hidden focus:ring-blue-500 focus:border-blue-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
											placeholder="Search"
										/>
									</div>
									<button
										type="button"
										className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									>
										<SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										<span className="ml-2">Sort</span>
										<ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
									</button>
									<Disclosure.Button className="group relative flex justify-between items-center text-left">
										<span className="ml-6 flex items-center">
											{open ? (
												<MinusSmIcon
													className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
													aria-hidden="true"
												/>
											) : (
													<PlusSmIcon
														className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
												)}
										</span>
									</Disclosure.Button>
								</div>
							</div>
						</div>
						<Disclosure.Panel as="div" className="max-w-2xl mx-auto py-8 px-2 lg:max-w-7xl">
							<div className="flex flex-row justify-between items-center">
								<div className="w-80 h-20 bg-white rounded-lg overflow-hidden">
									<label className="block text-sm font-medium text-gray-700">
										Name
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="category-name"
											id="category-name"
											className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
											placeholder="Awesome category"
										/>
									</div>
								</div>
								<button
									type="button"
									className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									onClick={addCategory}
								>
									Create new category
								</button>

							</div>
							<div>
								{categories.filter(c => c.id !== -1).map((category) => (
									<Disclosure defaultOpen>
										{({ open }) => (
											<>
												<div className="pb-5 mt-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
													<div className="text-md leading-6 font-medium text-gray-900">{category.name}</div>
													<Disclosure.Button className="group relative flex justify-between items-center text-left">
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-blue-400 group-hover:text-blue-500"
																	aria-hidden="true"
																/>
															) : (
																	<PlusSmIcon
																		className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																		aria-hidden="true"
																	/>
																)}
														</span>
													</Disclosure.Button>
												</div>
												<Disclosure.Panel as="div" className="max-w-2xl mx-auto py-8 px-2 lg:max-w-7xl">
													<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
														{category.traits.map((trait) => (
															<Trait trait={trait} categories={categories} moveTrait={moveTrait} currentCategory={category}/>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	)
}

export default EditProject