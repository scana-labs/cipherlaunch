import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import CompatibilityPanel from './CompatibilityPanel'
import Trait from './Trait'

const TraitContainer = ({
	layers,
	currentLayer,
	moveTrait,
	projectId,
	removeTrait,
	traits = [],
}) => {
	const [panelOpen, setPanelOpen] = useState(false)
	const [currentTrait, setCurrentTrait] = useState({}) // TODO: Use correct default

	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<div className="flex h-full w-full flex-wrap">
				{traits.map((t, idx) => (
					<Trait
						key={`trait-${t.id}`}
						layers={layers}
						currentLayer={currentLayer}
						moveTrait={moveTrait}
						removeTrait={removeTrait}
						setCompPanel={setPanelOpen}
						setCurrentTrait={setCurrentTrait}
						trait={t}
					/>
				))}
			</div>
			<CompatibilityPanel currentLayer={currentLayer} currentTrait={currentTrait} layers={layers} panelOpen={panelOpen} projectId={projectId} setPanelOpen={setPanelOpen} />
		</div>
	)
}

export default TraitContainer 