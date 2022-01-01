import Community from '../assets/Community.png'
import Lock from '../assets/Lock.png'
import MobileGraph from '../assets/MobileGraph.png'

const features = [
	{
		name: 'Easily manage and generate assets',
		description: '',
		imgSrc: MobileGraph,
	},
	{
		name: 'No-code smart contract',
		description: 'We work with you to develop and deploy the smart contract you want so you can focus on what you love',
		imgSrc: MobileGraph,
	},
	{
		name: 'Managing your community',
		description: 'Automate updates, track numbers, and integrate with your favorite community tools all in one place',
		imgSrc: MobileGraph,
	},
]

const Features = () => (
	<div className="py-12">
		<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="flex flex-row">
				<img className="" src={MobileGraph} alt="Mobile Graph" />
				<div className="flex flex-col justify-center">
					<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
						<span className="block xl:inline">Manage & generate assets</span>
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Prototype, design, and generate your assets all in one place
					</p>
				</div>
			</div>
		</div>
		<div className="flex flex-row">
			<div className="flex flex-col justify-center">
				<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
					<span className="block xl:inline">No-code smart contract</span>
				</h3>
				<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
					Design, develop, and deploy the smart contract you want without any code
				</p>
			</div>
			<img className="" src={Lock} alt="Lock" />
		</div>
		<div className="flex flex-row">
			<img className="" src={Community} alt="Community" />
			<div className="flex flex-col justify-center">
				<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
					<span className="block xl:inline">Manage your community</span>
				</h3>
				<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
					Automate updates, run airdrops, and integrate with your favorite community tools all in one place
				</p>
			</div>
		</div>
	</div>
)

export default Features