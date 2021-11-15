/*
Example Distribution
{
	Background: {
		Green: {actual_rarity: 0.8, input_rarity: 0.68}
		Red: {actual_rarity: 0.2, input_rarity: 0.3}
	},
	Eyes: {Laser: {…}, Cool Sunglasses: {…}, Nerd: {…}, Heart: {…}, Venom: {…}},
	Face Color: {Grey: {…}, Yellow: {…}, Blue: {…}},
	Mouth: {Drooling: {…}, Full Beard: {…}, Pizza: {…}, Tongue Out: {…}},
}
*/
const MetricsView = ({ distribution }) => {
	return (
		<div className="mt-3">
			<div>
				<h3 className="text-lg leading-6 font-medium text-gray-900">Token Trait Distribution</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">See the actual trait percentages in the collection versus the submitted trait rarities</p>
			</div>
			<div className="mt-5 border-t border-gray-200">
					{Object.keys(distribution).map((k, idx) => {
						return (
						<dl key={`${k}-${idx}`} className="sm:divide-y sm:divide-gray-200">
							{Object.keys(distribution[k]).map((traitKey, idx) => {
								const trait = distribution[k][traitKey]
								return (
									<div key={`${traitKey}-${idx}`} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
										<dt className="text-sm font-medium text-gray-500">{traitKey}</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Projected: % {trait.input_rarity} <br/> Actual: % {trait.actual_rarity}</dd>
									</div>
								)
							})}
						</dl>
						)
					})}
			</div>
		</div>
	)
}

export default MetricsView