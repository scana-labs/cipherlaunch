const TokensView = ({ tokens }) => {
	return (
		<ul className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{tokens.map((token, idx) => (
				<li
					key={`token-view-${idx}`}
					className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
				>
					<div className="flex-1 flex flex-col p-2">
						<h3 className="m-2 text-gray-900 text-sm font-medium">{token.name}</h3>
						<div className="w-full h-32 overflow-y-scroll">
							<ul className="">
								{token.attributes.map((att, idx) => (
									<li key={`att-${idx}`} className="py-1 flex">
										<div className="ml-3 flex">
											<p className="text-sm font-medium text-gray-900">{att.trait_type}: {att.value}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</li>
			))}
		</ul>
	)
}

export default TokensView