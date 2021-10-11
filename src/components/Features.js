const features = [
	{
		name: 'Easily manage and generate assets',
		description: 'Prototype, design, and generate your assets all in one place',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" fontSize="90">🎨</text></svg>,
	},
	{
		name: 'No-code smart contract',
		description: 'We work with you to develop and deploy the smart contract you want so you can focus on what you love',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" fontSize="90">📜</text></svg>,
	},
	{
		name: 'Managing your community',
		description: 'Automate updates, track numbers, and integrate with your favorite community tools all in one place',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" fontSize="90">🏛</text></svg>,
	},
]
  
const Features = () => (
	<div className="py-12 bg-white">
		<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<h2 className="sr-only">A better way to send money.</h2>
			<dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
			{features.map((feature) => (
				<div key={feature.name}>
					<dt>
						<div className="flex items-center justify-center h-12 w-12 rounded-md text-white">
							{feature.icon}
						</div>
						<p className="mt-5 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
					</dt>
					<dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
				</div>
			))}
			</dl>
		</div>
	</div>
)

export default Features