import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, MenuIcon, SearchIcon, SortAscendingIcon } from '@heroicons/react/solid'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Trait from './Trait'

const getItemStyle = (isDragging, draggableStyle) => ({
	userSelect: "none",
	padding: 16,
	margin: '0 0 8px 0',
	// change background colour if dragging
	background: isDragging ? "lightgrey" : "white",
	...draggableStyle
})

const Categories = ({ addCategory, categories, handleDragEnd, moveTrait }) => {
	const [query, setQuery] = useState('')

	return (
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
										onChange={(e) => setQuery(e.target.value)}
									/>
									<input
										type="text"
										name="desktop-search-candidate"
										id="desktop-search-candidate"
										className="hidden focus:ring-blue-500 focus:border-blue-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
										placeholder="Search"
										onChange={(e) => setQuery(e.target.value)}
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
								className="w-36 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								onClick={addCategory}
							>
								Create new category
									</button>

						</div>
						<DragDropContext onDragEnd={handleDragEnd}>
							{categories.length === 1 ?
								<div className="h-full w-full flex items-center justify-center mt-5">
									<p className="font-medium text-gray-700">Oops no cateogories!</p>
								</div>
								:
								<Droppable droppableId="droppable">
									{(provided, snapshot) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
										>
											{categories.filter(c => c.id !== -1).filter(c => c.name.includes(query)).map((category, index) => (
												<Draggable key={category.id} draggableId={`${category.id}`} index={index}>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<Disclosure defaultOpen>
																{({ open }) => (
																	<>
																		<div className="pb-5 mt-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
																			<div className="flex">
																				<MenuIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" />
																				<div className="ml-3 text-md leading-6 font-medium text-gray-900">{category.name}</div>
																			</div>
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
																					<Trait trait={trait} categories={categories} moveTrait={moveTrait} currentCategory={category} />
																				))}
																			</div>
																		</Disclosure.Panel>
																	</>
																)}
															</Disclosure>
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							}
						</DragDropContext>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Categories