import { useCallback, useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { Link, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import Storage from '@aws-amplify/storage'
import {
	ChevronDownIcon,
	ChevronRightIcon,
	HomeIcon,
	PlusCircleIcon,
	SearchIcon,
	SortAscendingIcon,
} from '@heroicons/react/solid'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import AddLayersModal from './AddLayersModal'
import Layer from './Layer'
import { listLayersUnderProject, listTraitsUnderLayer } from '../graphql/queries';
import { PrivateRoute } from '../App'
import Spinner from './Spinner'
import TraitContainer from './TraitContainer'

const getItemStyle = (isDragging) => ({
	// change background colour if dragging
	backgroundColor: isDragging ? 'rgb(248,248,255)' : 'white',
})

const Layers = ({
	addLayer,
	handleDragEnd,
	layers,
	moveTrait,
	projectId,
	removeLayer,
	removeTrait,
	selectedLayer,
	setLayers,
	setSelectedLayer,
	setSelectedTraits,
	setTraitModalOpen,
	setTraitPanelOpen,
}) => {
	const { path } = useRouteMatch()
	const traitMatch = useRouteMatch(`${path}/:layerId/traits`)

	const [isSpinning, setIsSpinning] = useState(true)
	const [layerModalOpen, setLayerModalOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [pages, setPages] = useState([
		{ name: 'Layers', href: `${path}/editProject`, current: false },
	])

	const handleSetBreadcrumb = (page) => {
		const newPages = [...pages]

		newPages.push(page)

		setPages(newPages)
	}

	const fetchLayers = useCallback(async () => {
		try {
			const layers = await API.graphql(graphqlOperation(listLayersUnderProject, { project_id: projectId }))
			const fetchedLayers = layers?.data?.listLayersUnderProject || []
			const paddedLayers = await Promise.all(fetchedLayers.map(async l => ({
				id: l.layer_id,
				name: l.name,
				traits: await fetchTraitsForLayer(l.layer_id)
			})))

			setIsSpinning(false)

			console.log('Layers', paddedLayers)

			setLayers(paddedLayers)
		}
		catch (e) {
			console.log('Error fetching layers:', e)
		}
	}, [setLayers, projectId]);

	const fetchTraitsForLayer = async (layerId) => {
		try {
			const traits = await API.graphql(graphqlOperation(listTraitsUnderLayer, { layer_id: layerId }))
			const fetchedTraits = traits?.data?.listTraitsUnderLayer || []
			console.log('Fetched Traits', fetchedTraits)
			const paddedTraits = await Promise.all(fetchedTraits.map(async t => ({
				id: t.trait_id,
				name: t.name,
				image_url: await Storage.get(t.image_url, { expires: 3600 }), // TODO: Update get options i.e. protected etc
				rarity: t.rarity,
			})))

			console.log('Traits', paddedTraits)

			return paddedTraits
		}
		catch (e) {
			console.log('Error fetching traits:', e)
		}

		return []
	}

	useEffect(() => {
		fetchLayers()
	}, [fetchLayers])

	// useEffect(() => {
	// 	console.log('Trait match', path, traitMatch)

	// 	if (!path.includes('trait')) {
	// 		const newPages = [...pages]

	// 		// TODO: Find a better way to do this
	// 		// When navigating back to LayersContainer update breadcrumbs correctly
	// 		setPages(newPages.filter(p => !p.href.includes('trait')))
	// 	}

	// }, [pages, path, traitMatch])

	return (
		<>
			<div className="mb-5 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="flex items-center space-x-4">
						{pages.map((page, idx) => (
							<li key={page.name}>
								<div className="flex items-center">
									{idx !== 0 && <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />}
									<Link
										to={page.href}
										className="ml-4 text-lg font-medium text-gray-500 hover:text-gray-700"
										aria-current={page.current ? 'page' : undefined}
									>
										{page.name}
									</Link>
								</div>
							</li>
						))}
					</ol>
				</nav>
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
							onClick={() => setLayerModalOpen(true)}
						>
							<PlusCircleIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
							Add Layer
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
			<Switch>
				<PrivateRoute exact path={`${path}/:layerId/trait`}>
					<TraitContainer
						layers={layers}
						currentLayer={selectedLayer}
						moveTrait={moveTrait}
						projectId={projectId}
						removeTrait={removeTrait}
						traits={selectedLayer.traits}
					/>
				</PrivateRoute>
				<PrivateRoute path={path}>
					<DragDropContext onDragEnd={handleDragEnd}>
						{isSpinning && <Spinner />}
						{!isSpinning && layers.length === 0 ?
							<div className="h-full w-full flex items-center justify-center mt-5">
								<p className="font-medium text-gray-700">Oops no layers!</p>
							</div>
							:
							<Droppable droppableId="droppable">
								{(provided, snapshot) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										<ul className="">
											{layers.filter(c => c.name.includes(query)).map((layer, index) => (
												<Draggable key={layer.id} draggableId={`${layer.id}`} index={index}>
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
															<li key={layer.id}>
																<div
																	className="border border-gray-200 rounded block hover:bg-gray-50"
																	style={getItemStyle(
																		snapshot.isDragging,
																	)}
																>
																	<Layer
																		handleSetBreadcrumb={handleSetBreadcrumb}
																		layer={layer}
																		removeLayer={removeLayer}
																		setSelectedLayer={setSelectedLayer}
																		setSelectedTraits={setSelectedTraits}
																		setTraitModalOpen={setTraitModalOpen}
																		setTraitPanelOpen={setTraitPanelOpen}
																	/>
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
				</PrivateRoute>
			</Switch>

			<AddLayersModal open={layerModalOpen} setOpen={setLayerModalOpen} addLayer={addLayer} />
		</>
	)
}

export default Layers