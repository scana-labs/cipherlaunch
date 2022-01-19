import { useEffect, useState } from 'react'
import { ReactComponent as Logo } from '../assets/Logo.svg'
import { ReactComponent as WaveBottom } from '../assets/WaveBottom.svg'
import { ReactComponent as WaveTop } from '../assets/WaveTop.svg'
import AssetDashboard from '../assets/AssetDashboard.png'
import AssetTrading from '../assets/AssetTrading.png'
import SmartContractFitted from '../assets/SmartContractFitted.png'
import Bayc from '../assets/logos/bayc.png'
import Coolcats from '../assets/logos/coolcats.png'
import CryptoPunks from '../assets/logos/cryptopunks.png'
import Doodles from '../assets/logos/doodles.png'
import WorldOfWomen from '../assets/logos/wow.png'
import CyberKongz from '../assets/logos/cyberkongz.gif'

import Features from './Features'
import Footer from './Footer'
import Team from './Team'
import Join from './Join'

import './Landing.css'

const projects = [
	{
		name: 'Bored Ape Yacht Club',
		img: Bayc,
	},
	{
		name: 'Cool Cats',
		img: Coolcats,
	},
	{
		name: 'CryptoPunks',
		img: CryptoPunks,
	},
	{
		name: 'Doodles',
		img: Doodles,
	},
	{
		name: 'World of Women',
		img: WorldOfWomen,
	},
	{
		name: 'CyberKongz',
		img: CyberKongz,
	},
]

const Landing = () => {
	const [idx, setIdx] = useState(0)

	useEffect(() => {
		const loopText = i => {
			if (i < projects.length) {
				setTimeout(() => {
					setIdx(i)
					loopText(++i)
				}, 2000)
			}
			else if (i === projects.length) {
				loopText(0)
			}
		}

		loopText(0)
	}, [])

	return (
		<div className="h-full w-full relative content-all">
			<div className="absolute z-0 w-full">
				<div className="lg:hidden w-full h-48 mobile-wave-box" />
				<WaveTop />
			</div>
			<div className="absolute w-full h-full">
				<div className="flex">
					<img className="block landing-bg-assets-trading z-10 object-scale-down" src={AssetTrading} alt="Asset Trading" />
				</div>
				<div className="flex">
					<img className="block ml-auto landing-bg-assets-dashboard z-10 object-scale-down" src={AssetDashboard} alt="Asset Dashboard" />
				</div>
			</div>
			<div className="absolute z-0 w-full bottom-0">
				<WaveBottom />
				<div className="md:hidden w-full h-48 mobile-wave-box" />
			</div>
			<div className="main-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="relative">
						<div className="flex py-5 z-10 justify-between">
							<Logo />
							<a
								href="https://docs.google.com/forms/d/e/1FAIpQLScxLqjghEvBveL4L2nMQfscCjA5gRIvLs4Nwl26IPNh9Ix7RQ/viewform"
								className="join-btn-header hidden md:flex"
								target="_blank"
								rel="noreferrer"
							>
								Join Waitlist
						</a>
						</div>
						<div className="relative flex lg:align-center justify-center lg:justify-start mt-10 lg:mt-0">
							<div className="flex flex-col items-center lg:items-start block lg:absolute sm:text-center lg:text-left top:16 xl:top-52 z-10">
								<h1 className="text-4xl tracking-tight font-semibold text-gray-900 sm:text-5xl md:text-6xl">
									<span className="hero-title block xl:inline">Build the next <br /> </span>
									<div className="flex justify-center items-center">
										<img className="h-20 w-20 mr-5 rounded-lg" src={projects[idx].img} alt="Project Logo" />
										<span className="hero-project-text underline underline-offset-4">{projects[idx].name}</span> {' '}
									</div>
								</h1>
								<p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
									Monetize your brand using NFTs and bring value to your community.
								</p>
								<div className="w-40 md:w-48 mt-5 sm:mt-8 flex justify-center lg:justify-start">
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
							<img className="hidden lg:block z-10 transform scale-50 xl:scale-75 ml-auto" src={SmartContractFitted} alt="Smart Contract" />
						</div>
					</div>

					<Features />

					<Team />

					<Join />

					<Footer />
				</div>
			</div>
		</div>
	)
}

export default Landing