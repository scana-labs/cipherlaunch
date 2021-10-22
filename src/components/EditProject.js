import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { API, graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { v4 as uuidv4 } from 'uuid';


import { DEFAULT_HOME_ROUTE } from '../constants/Routes'
import {createLayer, createTrait } from '../graphql/mutations'
import AddTraitModal from './AddTraitModal'
import Layers from './Layers'
import PreviewPanel from './PreviewPanel'
import TraitPanel from './TraitPanel'

const defaultLayer = { id: -1, name: 'Default Layer', traits: [] };

const EditProject = () => {
	const [layers, setLayers] = useState([defaultLayer])
	const [selectedLayer, setSelectedLayer] = useState(defaultLayer)
	const [selectedTraits, setSelectedTraits] = useState([])
	const [previewPanelOpen, setPreviewPanelOpen] = useState(false)
	const [traitPanelOpen, setTraitPanelOpen] = useState(false)
	const [traitModalOpen, setTraitModalOpen] = useState(false)

	const sumReducer = (previousValue, currentValue) => previousValue + currentValue;
	const productReducer = (previousValue, currentValue) => previousValue * currentValue;
	const projectId = useLocation() //TODO: placeholder


	const addTrait = async (name, rarity, layerId) => {
		const imageFile = document.getElementById('trait-image').value
		const traitId = uuidv4()

		if (name && rarity && layerId) {
			let newTrait;

			const traitAttributes = {
				trait_id: traitId,
				name,
				rarity,
			}

			// TODO:
			// - Do we need this call?
			// - We should error check all GQL calls
			await API.graphql(graphqlOperation(createTrait, { createTraitInput: newTrait }))
			if (imageFile) {
				try {
					const traitIdImageName = `${traitId}.png`
					await Storage.put(traitIdImageName, imageFile)
					newTrait = { ...traitAttributes, bucket_url: `s3://${traitIdImageName}` }
					await API.graphql(graphqlOperation(createTrait, { createTraitInput: newTrait }))

				}
				catch (error) {
					console.log('Error uploading trait image:', error)
				}
			} else {
				newTrait = traitAttributes
				await API.graphql(graphqlOperation(createTrait, { createTraitInput: newTrait }))
			}

			const newLayers = [...layers]

			// Add trait to layer
			newLayers.filter(c => c.id === layerId)[0].traits.push(newTrait)

			setLayers(newLayers)

			// Reset input fields
			document.getElementById('trait-name').value = ''
			document.getElementById('trait-rarity').value = ''
			document.getElementById('trait-image').value = ''
		}
	}

	const addLayer = async () => {
		const name = document.getElementById('layer-name').value

		if (name) {
			const newLayer = {
				layer_id: uuidv4(),
				project_id: projectId,
				name: name,
				layer_order: `${layers.length + 1}`
			}
			await API.graphql(graphqlOperation(createLayer, { createLayerInput: newLayer }))
			setLayers([...layers, newLayer])

			document.getElementById('layer-name').value = ''
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
		<div className="flex flex-col w-0 flex-1 m-5">
			<Link className="underline hover:text-blue-600" to={DEFAULT_HOME_ROUTE}>Back to Projects</Link>
			<div className="mb-5">
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Traits</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.map(c => c.traits.length).reduce(sumReducer, 0)}</dd>
					</div>
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Layers</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.length - 1}</dd>
					</div>
					<div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
						<dt className="text-sm font-medium text-gray-500 truncate">Total Tokens</dt>
						<dd className="mt-1 text-3xl font-semibold text-gray-900">{layers.filter(c => c.id !== -1).map(c => c.traits.length).reduce(productReducer, 1)}</dd>
					</div>
				</dl>
			</div>
			{/* Layers */}
			<Layers
				addLayer={addLayer}
				layers={layers}
				handleDragEnd={handleDragEnd}
				moveTrait={moveTrait}
				setPreviewPanelOpen={setPreviewPanelOpen}
				setSelectedLayer={setSelectedLayer}
				setSelectedTraits={setSelectedTraits}
				setTraitModalOpen={setTraitModalOpen}
				setTraitPanelOpen={setTraitPanelOpen}
			/>
			<AddTraitModal layerIdToModify={selectedLayer.id} open={traitModalOpen} setOpen={setTraitModalOpen} addTrait={addTrait} />
			<PreviewPanel
				previewPanelOpen={previewPanelOpen}
				setPreviewPanelOpen={setPreviewPanelOpen}
			/>
			<TraitPanel
				layers={layers}
				moveTrait={moveTrait}
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