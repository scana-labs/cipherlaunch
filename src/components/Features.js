import Community from '../assets/Community.png'
import Lock from '../assets/Lock.png'
import MobileGraph from '../assets/MobileGraph.png'

const Features = () => (
	<div className="xl:py-12">
		<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10">
			<div className="flex flex-wrap lg:flex-nowrap justify-center">
				<img className="" src={MobileGraph} alt="Mobile Graph" />
				<div className="flex flex-col justify-center">
					<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
						<span className="block xl:inline">Generate assets</span>
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Prototype and generate your assets on our self serve software platform
					</p>
				</div>
			</div>
		</div>
		<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10">
			<div className="flex flex-wrap lg:flex-nowrap justify-center">
				<img className="lg:hidden" src={Lock} alt="Lock" />
				<div className="flex flex-col justify-center">
					<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
						<span className="block xl:inline">Access deep NFT expertise</span>
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Work with technical and strategic partners to deliver the most robust smart contract and NFT marketing strategy
					</p>
				</div>
				<img className="hidden lg:block" src={Lock} alt="Lock" />
			</div>
		</div>
		<div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-10">
			<div className="flex flex-wrap lg:flex-nowrap justify-center">
				<img className="" src={Community} alt="Community" />
				<div className="flex flex-col justify-center">
					<h3 className="tracking-tight font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-4xl">
						<span className="block xl:inline">Manage your community</span>
					</h3>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
						Use a suite of tools that enable simple ERC-721 airdrops, ERC-20 tokenomics and more
					</p>
				</div>
			</div>
		</div>
	</div>
)

export default Features