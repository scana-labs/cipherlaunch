import AddTraitModal from './AddTraitModal'
import LayersContainer from './LayersContainer'
import TraitPanel from './TraitPanel'

const EditProject = ({
	addLayer,
	handleDragEnd,
	layers,
	moveTrait,
	projectId,
	removeLayer,
	setLayers,
	setSelectedLayer,
	setSelectedTraits,
	setTraitModalOpen,
	setTraitPanelOpen,
	removeTrait,
	selectedLayer,
	traitPanelOpen,
	selectedTraits,
	traitModalOpen,
	addTrait,
}) => {
	return (
		<>
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
		</>
	)
}

export default EditProject