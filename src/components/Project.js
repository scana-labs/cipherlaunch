import { useState, useEffect } from 'react'
import {
	CollectionIcon,
	PencilAltIcon,
} from '@heroicons/react/solid'
import { Link, useParams, useRouteMatch, Switch } from 'react-router-dom'
import { API, graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { v4 as uuidv4 } from 'uuid';

import { createLayer, createTrait, deleteLayer, deleteTrait, updateLayer } from '../graphql/mutations'
import { getProject } from '../graphql/queries'
import classNames from '../util/classNames'
import { DEFAULT_PROJECTS_ROUTE } from '../constants/Routes'
import AddTraitModal from './AddTraitModal'
import LayersContainer from './LayersContainer'
import { PrivateRoute } from '../App';
import TraitPanel from './TraitPanel'
import Collections from './Collections'

const defaultLayer = { id: -1, name: 'Default Layer', traits: [] }

const Project = ({ projects }) => {
	const { projectId } = useParams() // Extract project_id from path
	const { path } = useRouteMatch()

	const [isFetchingProject, setIsFetchingProject] = useState(false)
	const [currentProject, setCurrentProject] = useState({})
	const [layers, setLayers] = useState([])
	const [nav, setNav] = useState([{ name: 'Edit Project', href: `${DEFAULT_PROJECTS_ROUTE}/${projectId}`, current: true }])
	const [selectedLayer, setSelectedLayer] = useState(defaultLayer) // TODO: Remove default layer
	const [selectedTraits, setSelectedTraits] = useState([])
	const [tabs, setTabs] = useState([
		{ name: 'Edit Project', href: '/editProject', icon: PencilAltIcon, current: true },
		{ name: 'Collections', href: '/collections', icon: CollectionIcon, current: false },
	])
	const [traitPanelOpen, setTraitPanelOpen] = useState(false)
	const [traitModalOpen, setTraitModalOpen] = useState(false)

	const sumReducer = (previousValue, currentValue) => previousValue + currentValue
	const productReducer = (previousValue, currentValue) => previousValue * currentValue

	const fetchProject = async (projectId) => {
		try {
			setIsFetchingProject(true)
			const project = await API.graphql(graphqlOperation(getProject, { project_id: projectId }))
			const fetchedProject = project?.data?.getProject || {}
			const paddedProject = { ...fetchedProject }

			paddedProject.id = projectId

			setCurrentProject(paddedProject)
			console.log('Fetched Project', paddedProject)
		}
		catch (e) {
			console.log('Error fetching project:', e)
		}
		finally {
			setIsFetchingProject(false)
		}
	}

	// Try to upload multiple trait images
	// Return false on error otherwise return list of traits to upload
	// Upload new trait for each image using metadata from traitTemplate. Each image will have the
	// same name and same rarity
	const tryUploadImages = async (images, traitTemplate) => {
		// TODO: Enforce better image validation
		// Move validation to modal
		if (images && images.length > 0) {
			if (!images.every(image => image instanceof File)) {
				console.log('One or more invalid File objects used for trait image.', images)
				return false
			}

			if (!images.every(image => image.type === 'image/png')) {
				console.log('One or more invalid image types. Please only upload PNGs.', images)
				return false
			}

			try {
				const newTraitIds = []
				// Promise.all preserves order
				const traitsToUpload = await Promise.all(images.map(i => {
					const traitId = uuidv4()
					const traitIdImageName = `projects/${projectId}/traitImages/${traitId}.png`
					newTraitIds.push(traitId)

					return Storage.put(traitIdImageName, i, {
						contentType: 'image/png'
					})
				}))

				return traitsToUpload.map(({ key }, index) => {
					const newTrait = { ...traitTemplate }
					newTrait.image_url = key
					newTrait.trait_id = newTraitIds[index]

					return newTrait
				})
			}
			catch (error) {
				console.log('Error uploading trait image:', error)
			}
		} else {
			console.log('No image(s) provided')
		}

		return false
	}

	// TODO: Cleanup handlers to not have to be passed down multiple children
	// name: String
	// rarity: String
	// layerId: String
	// image: File
	const addTrait = async (name, rarity, layerId, images) => {
		if (name && rarity && layerId) {
			// Default to only uploading one trait
			let traitsToUpload = [{
				trait_id: uuidv4(),
				name,
				layer_id: layerId,
				project_id: projectId,
				rarity,
			}]
			let uploadedTraits = []

			// TODO: Enforce better image validation
			// Move validation to modal
			const uploadedImageTraits = await tryUploadImages(images, traitsToUpload[0])

			if (uploadedImageTraits) {
				traitsToUpload = uploadedImageTraits
			}

			console.log('Traits to Upload', traitsToUpload)

			try {
				uploadedTraits = await Promise.all(traitsToUpload.map(async t => {
					return API.graphql(graphqlOperation(createTrait, { createTraitInput: t }))
				}))
			}
			catch (e) {
				console.log('Error uploading multiple traits', traitsToUpload, e)
			}

			// Add uploading indicator to layer
			if (uploadedTraits.length > 0) {
				console.log('New Traits', uploadedTraits, traitsToUpload)

				// Fetch images for traits
				const fetchedTraits = await Promise.all(traitsToUpload.map(async t => {
					const fetchedTrait = { ...t }
					fetchedTrait.image_url = await Storage.get(t.image_url, { expires: 3600 }) // TODO: Update GET options, consolidate function

					return fetchedTrait
				}))

				const newLayers = [...layers]

				// Add trait(s) to layer
				const layerToUpdate = newLayers.filter(c => c.id === layerId)[0]
				layerToUpdate.traits = layerToUpdate.traits.concat(fetchedTraits)

				setLayers(newLayers)
			}
		}
	}

	const removeTrait = async (traitId, layerId) => {
		if (!traitId) {
			console.log('Error deleting layer id: invalid traitId', traitId)
		}

		console.log('Deleting trait', traitId)

		try {
			await API.graphql(graphqlOperation(deleteTrait, { trait_id: traitId }))
			const newLayers = [...layers]
			const filtered = newLayers.filter(layer => layer.id === layerId)

			// TODO: Should remove image from S3?

			if (filtered.length > 0) {
				const layerIndex = newLayers.indexOf(filtered[0])
				const newTraits = [...filtered[0].traits]
				newTraits.splice(newTraits.indexOf(newTraits.filter(t => t.id === traitId)[0]), 1) // FIXME, better error handling
				newLayers[layerIndex].traits = newTraits

				setLayers(newLayers)
				setSelectedTraits(newTraits)
			}
			else {
				console.log('Error deleting trait. Unable to find layerId:', layerId)
			}
		}
		catch (e) {
			console.log('Error deleting layer', e)
		}
	}

	const addLayer = async () => {
		const name = document.getElementById('layer-name').value

		if (name) {
			try {
				const newLayerInput = {
					layer_id: uuidv4(),
					project_id: projectId,
					name: name,
					layer_order: `${layers.length + 1}`
				}
				const createdLayer = await API.graphql(graphqlOperation(createLayer, { createLayerInput: newLayerInput }))
				const createdLayerMetadata = createdLayer?.data?.createLayer || []
				const newLayer = { id: createdLayerMetadata.layer_id, name: createdLayerMetadata.name, traits: [] }

				setLayers([...layers, newLayer])
			}
			catch (e) {
				console.log('Error creating new layer:', e)
			}
		}
	}

	const removeLayer = async (layerId) => {
		if (!layerId) {
			console.log('Error deleting layer id: invalid layerId', layerId)
		}

		console.log('Deleting layer', layerId)

		try {
			await API.graphql(graphqlOperation(deleteLayer, { layer_id: layerId }))
			const newLayers = [...layers]
			const filtered = newLayers.filter(layer => layer.id === layerId)

			if (filtered.length > 0) {
				newLayers.splice(newLayers.indexOf(filtered[0]), 1)
				setLayers(newLayers)
			}
			else {
				console.log('Error deleting layer. Unable to find layerId:', layerId)
			}
		}
		catch (e) {
			console.log('Error deleting layer', e)
		}
	}

	// Move trait from currentCategoryId to newCategoryId
	const moveTrait = (traitId, newLayerId, currentLayerId) => {
		const newLayers = [...layers]

		// Find current layer
		const currentLayer = newLayers.filter(c => c.id === currentLayerId)[0]
		// Find trait
		const trait = currentLayer.traits.filter(t => t.id === traitId)[0]
		// Find index of trait
		const traitIndex = currentLayer.traits.indexOf(trait)

		// If trait exists
		if (traitIndex > -1) {
			// Copy trait
			const traitCopy = { ...trait }
			// Add trait to new layer
			newLayers.filter(c => c.id === newLayerId)[0].traits.push(traitCopy)

			// Remove trait from existing layer
			currentLayer.traits.splice(traitIndex, 1)

			setLayers(newLayers)
		}
	}

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	};

	// All layer logic should probably move into Layers
	const handleDragEnd = async (result) => {
		if (!result.destination) {
			return
		}

		// Filter out not-categorized layer
		const reorderedLayers = reorder(layers, result.source.index, result.destination.index)

		// Update layer order
		// TODO: Do this in batch
		console.log('Order', reorderedLayers)

		try {
			await Promise.all(reorderedLayers.map((l, idx) => {
				const updateLayerInput = {
					name: l.name,
					project_id: projectId,
					layer_id: l.id,
					layer_order: idx,
				}

				return API.graphql(graphqlOperation(updateLayer, { updateLayerInput, }))
			}))
		}
		catch (e) {
			console.log('Error updating layer', e)
		}

		setLayers([...reorderedLayers])
	}

	useEffect(() => {
		console.log('Projects', projects)
		setCurrentProject(projects.filter(p => p.id === projectId)[0] || {})
	}, [projects, projectId])

	useEffect(() => {
		fetchProject(projectId)
	}, [projectId])

	return (
		<div className="flex flex-col flex-1 m-5">
			<div className="text-2xl">{isFetchingProject ? 'Loading...' : currentProject?.name}</div>
			<div className="mt-3">
				<div className="sm:hidden">
					<label htmlFor="tabs" className="sr-only">
						Select a tab
					</label>
					{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
					<select
						id="tabs"
						name="tabs"
						className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
						defaultValue={tabs.find((tab) => tab.current).name}
					>
						{tabs.map((tab) => (
							<option key={tab.name}>{tab.name}</option>
						))}
					</select>
				</div>
				<div className="hidden sm:block">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex space-x-8" aria-label="Tabs">
							{tabs.map((tab) => (
								<Link
									key={tab.name}
									to={`/projects/${projectId}${tab.href}`}
									className={classNames(
										tab.current
											? 'border-blue-500 text-blue-600'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
										'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
									)}
									aria-current={tab.current ? 'page' : undefined}
									onClick={() => {
										let newTabs = [...tabs]
										newTabs = newTabs.map(t => {
											t.current = false
											return t
										})
										newTabs.filter(t => t.name === tab.name)[0].current = true
										setTabs(newTabs)
									}}
								>
									<tab.icon
										className={classNames(
											tab.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
											'-ml-0.5 mr-2 h-5 w-5'
										)}
										aria-hidden="true"
									/>
									<span>{tab.name}</span>
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>
			<Switch>
				<PrivateRoute path={`${path}/editProject`}>
					<div className="mb-5">
						<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
							<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
								<dt className="text-sm font-medium text-gray-500 truncate">Total Traits</dt>
								<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.map(l => l.traits.length).reduce(sumReducer, 0)}</dd>
							</div>
							<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
								<dt className="text-sm font-medium text-gray-500 truncate">Total Layers</dt>
								<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.length}</dd>
							</div>
							<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
								<dt className="text-sm font-medium text-gray-500 truncate">Total Tokens</dt>
								<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.filter(l => l.id !== -1).map(l => l.traits.length).reduce(productReducer, 1)}</dd>
							</div>
						</dl>
					</div>
					{/* Layers */}
					<LayersContainer
						addLayer={addLayer}
						handleDragEnd={handleDragEnd}
						layers={layers}
						moveTrait={moveTrait}
						projectId={projectId}
						removeLayer={removeLayer}
						removeTrait={removeTrait}
						selectedLayer={selectedLayer}
						setLayers={setLayers}
						setSelectedLayer={setSelectedLayer}
						setSelectedTraits={setSelectedTraits}
						setTraitModalOpen={setTraitModalOpen}
						setTraitPanelOpen={setTraitPanelOpen}
					/>
					<AddTraitModal layerIdToModify={selectedLayer.id} open={traitModalOpen} setOpen={setTraitModalOpen} addTrait={addTrait} />
					<TraitPanel
						layers={layers}
						moveTrait={moveTrait}
						removeTrait={removeTrait}
						selectedLayer={selectedLayer}
						setTraitModalOpen={setTraitModalOpen}
						setTraitPanelOpen={setTraitPanelOpen}
						traitPanelOpen={traitPanelOpen}
						traits={selectedTraits}
					/>
				</PrivateRoute>
				<PrivateRoute path={`${path}/collections`}>
					<Collections project={currentProject} layers={layers} />
				</PrivateRoute>
			</Switch>
		</div>
	)
}

export default Project