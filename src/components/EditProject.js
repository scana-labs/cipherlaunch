import { useState } from 'react'
import { CollectionIcon, ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import { Link, useParams } from 'react-router-dom'
import { API, graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_PROJECTS_ROUTE } from '../constants/Routes'
import { createLayer, createTrait, deleteLayer, deleteTrait } from '../graphql/mutations'
import AddTraitModal from './AddTraitModal'
import LayersContainer from './LayersContainer'
import TraitPanel from './TraitPanel'

const defaultLayer = { id: -1, name: 'Default Layer', traits: [] }

const EditProject = () => {
	const { projectId } = useParams() // Extract project_id from path

	const [layers, setLayers] = useState([])
	const [nav, setNav] = useState([{ name: 'Edit Project', href: `${DEFAULT_PROJECTS_ROUTE}/${projectId}`, current: true }])
	const [selectedLayer, setSelectedLayer] = useState(defaultLayer) // TODO: Remove default layer
	const [selectedTraits, setSelectedTraits] = useState([])
	const [traitPanelOpen, setTraitPanelOpen] = useState(false)
	const [traitModalOpen, setTraitModalOpen] = useState(false)

	const sumReducer = (previousValue, currentValue) => previousValue + currentValue
	const productReducer = (previousValue, currentValue) => previousValue * currentValue

	// TODO: Cleanup handlers to not have to be passed down multiple children
	// name: String
	// rarity: String
	// layerId: String
	// image: File
	const addTrait = async (name, rarity, layerId, image) => {
		const traitId = uuidv4()

		if (name && rarity && layerId) {
			let addTraitIsSuccess = false
			const traitIdImageName = `projects/${projectId}/${traitId}.png`
			const newTrait = {
				name,
				layer_id: layerId,
				project_id: projectId,
				rarity,
				trait_id: traitId,
			}

			// TODO: Enforce better image validation
			// Move validation to modal
			if (image) {
				let invalidFile = false

				if (!image instanceof File) {
					console.log('Invalid File object used for trait image')
					invalidFile = true
				}

				if (image.type !== 'image/png') {
					console.log('Invalid image type. Please only upload PNGs')
					invalidFile = true
				}

				if (!invalidFile) {
					try {
						const result = await Storage.put(traitIdImageName, image, {
							contentType: 'image/png'
						})
						newTrait.image_url = result.key // TODO Update public prefix, change to be image_key
					}
					catch (error) {
						console.log('Error uploading trait image:', error)
					}
				}
			} else {
				console.log('No image provided')
			}

			try {
				await API.graphql(graphqlOperation(createTrait, { createTraitInput: newTrait }))
				addTraitIsSuccess = true
			}
			catch (e) {
				console.log('Error adding trait', e)
			}

			if (addTraitIsSuccess) {
				const newLayers = [...layers]

				// Add trait to layer
				newLayers.filter(c => c.id === layerId)[0].traits.push(newTrait)

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
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	// All layer logic should probably move into Layers
	const handleDragEnd = (result) => {
		if (!result.destination) {
			return
		}

		// Filter out not-categorized layer
		const reorderedLayers = reorder(layers, result.source.index, result.destination.index);

		setLayers([...reorderedLayers])
	}

	return (
		<div className="flex flex-col flex-1 m-5">
			<div className="flex justify-between items-center">
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="flex items-center space-x-4">
						<li>
							<div>
								<Link to={DEFAULT_PROJECTS_ROUTE} className="text-gray-400 hover:text-gray-500">
									<HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
									<span className="sr-only">Home</span>
								</Link>
							</div>
						</li>
						{nav.map((page) => (
							<li key={page.name}>
								<div className="flex items-center">
									<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
									<Link
										to={page.href}
										className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
										aria-current={page.current ? 'page' : undefined}
									>
										{page.name}
									</Link>
								</div>
							</li>
						))}
					</ol>
				</nav>
				<button
					type="button"
					className="w-36 mr-5 inline-flex justify-center text-center items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<CollectionIcon className="-ml-1 mr-2 h-5 w-5 text-gray-300" aria-hidden="true" />
						Generate
					<ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
				</button>
			</div>
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
		</div>
	)
}

export default EditProject