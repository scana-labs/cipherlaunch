import { useState } from 'react'
import {
	ChevronDownIcon,
	ChevronRightIcon,
	MenuIcon,
	PlusCircleIcon,
	PhotographIcon,
	PuzzleIcon,
	SearchIcon,
	SortAscendingIcon,
} from '@heroicons/react/solid'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import AddCategoryModal from './AddCategoryModal'

const getItemStyle = (isDragging) => ({
	// change background colour if dragging
	backgroundColor: isDragging ? 'rgb(248,248,255)' : 'white',
})

const Categories = ({
	addCategory,
	categories,
	handleDragEnd,
	setPreviewPanelOpen,
	setSelectedCategory,
	setSelectedTraits,
	setTraitModalOpen,
	setTraitPanelOpen,
}) => {
	const [categoryModalOpen, setCategoryModalOpen] = useState(false)
	const [query, setQuery] = useState('')

	return (
		<>
			<div className="mb-5 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Layers</h3>
				<div className="mt-3 sm:mt-0 sm:ml-4">
					<label htmlFor="mobile-search-candidate" className="sr-only">
						Search
					</label>
					<label htmlFor="desktop-search-candidate" className="sr-only">
						Search
					</label>
					<div className="flex rounded-md">
						<button
							type="button"
							className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => setCategoryModalOpen(true)}
						>
							<PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
							Add Layer
						</button>
						<button
							type="button"
							className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => setPreviewPanelOpen(true)}
						>
							<PhotographIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
							Token Preview
						</button>
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
					</div>
				</div>
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				{categories.length === 0 ?
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
								<ul className="">
									{categories.filter(c => c.name.includes(query)).map((category, index) => (
										<Draggable key={category.id} draggableId={`${category.id}`} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														userSelect: "none",
														padding: 8,
														...provided.draggableProps.style,
													}}
												>
													<li key={category.id}>
														<div
															className="border border-gray-200 rounded block hover:bg-gray-50"
															style={getItemStyle(
																snapshot.isDragging,
															)}
														>
															<div className="px-4 py-4 flex items-center sm:px-6">
																<div className="min-w-0 flex-1 sm:flex sm:items-center">
																	<MenuIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
																	<div className="ml-5 truncate">
																		<div className="flex text-sm">
																			<p className="font-medium text-blue-600 truncate">{category.name}</p>
																		</div>
																		<div className="mt-2 flex">
																			<div className="flex items-center text-sm text-gray-500">
																				<PuzzleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
																				<p>
																					{category.traits.length} traits
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
																			setSelectedCategory(category)
																			setTraitModalOpen(true)
																		}}
																	>
																		<PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
																		Add Trait
																	</button>
																	<button
																		type="button"
																		className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
																		onClick={() => {
																			setSelectedCategory(category)
																			setSelectedTraits(category.traits)
																			setTraitPanelOpen(true)
																		}}
																	>
																		<PuzzleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
																		Traits
																	</button>
																	<ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
																</div>
															</div>
														</div>
													</li>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</ul>
							</div>
						)}
					</Droppable>
				}
			</DragDropContext>

			<AddCategoryModal open={categoryModalOpen} setOpen={setCategoryModalOpen} addCategory={addCategory} />
		</>
	)
}

export default Categories