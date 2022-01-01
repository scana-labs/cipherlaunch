
import { ReactComponent as Logo } from '../assets/Logo.svg'
import { ReactComponent as WaveBottom } from '../assets/WaveBottom.svg'
import { ReactComponent as WaveTop } from '../assets/WaveTop.svg'
import AssetDashboard from '../assets/AssetDashboard.png'
import AssetTrading from '../assets/AssetTrading.png'
import SmartContract from '../assets/SmartContract.png'

import NavBarPublic from './NavBarPublic'
import Features from './Features'
import Footer from './Footer'
import Team from './Team'
import Join from './Join'

import './Landing.css'

const Landing = () => (
	<div className="h-full w-full relative">
		<div className="absolute z-0 w-full">
			<WaveTop />
		</div>
		<div className="absolute w-full h-full">
			<img className="landing-bg-assets-trading z-10 float-left" src={AssetTrading} alt="Asset Trading" />
			<img className="landing-bg-assets-dashboard z-10 float-right" src={AssetDashboard} alt="Asset Dashboard" />
		</div>
		<div className="main-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="hero-main">
					<div className="absolute flex inset-x-0 top-0 m-10 z-10 justify-between">
						<Logo />
						<a
							href="https://docs.google.com/forms/d/e/1FAIpQLScxLqjghEvBveL4L2nMQfscCjA5gRIvLs4Nwl26IPNh9Ix7RQ/viewform"
							className="join-btn-header"
							target="_blank"
							rel="noreferrer"
						>
							Join Waitlist
						</a>
					</div>
					<img className="absolute z-10 -right-40 transform scale-75" src={SmartContract} alt="Smart Contract" />
					<div className="relative sm:text-center lg:text-left top-52 z-10">
						<h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="hero-title block xl:inline">Launch your NFT <br /> with no code</span>{' '}
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Manage individual assets and generate tokens with a single click. Turn those assets into NFTs with your own smart contract.
					</p>
						<div className="w-40 md:w-48 mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<a
								href="https://docs.google.com/forms/d/e/1FAIpQLScxLqjghEvBveL4L2nMQfscCjA5gRIvLs4Nwl26IPNh9Ix7RQ/viewform"
								className="join-btn"
								target="_blank"
								rel="noreferrer"
							>
								Join Waitlist
							</a>
						</div>
					</div>
				</div>

				<Features />

				<Team />

				<Join />

				<Footer />

			</div>
		</div>
		<div className="absolute z-0 w-full">
			<WaveBottom />
		</div>
	</div>
)

export default Landing