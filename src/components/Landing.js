import { ReactComponent as Lucid } from '../assets/lucid.svg'

import NavBarPublic from './NavBarPublic'
import Features from './Features'
import Footer from './Footer'
import Team from './Team'

import './Landing.css'

const Landing = () => (
	<div className="relative bg-white overflow-hidden">
		<NavBarPublic />
		<div className="flex w-screen">
			<div className="relative w-full md:w-1/2">
				<svg
					className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
					fill="currentColor"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<polygon points="50,0 100,0 50,100 0,100" />
				</svg>
				<main className="flex h-full justify-center items-center m-16">
					<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">Launch your NFT <br/> with <u>no code</u></span>{' '}
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
							Manage individual assets and generate tokens with a single click. Turn those assets into NFTs with your own smart contract.
						</p>
						<div className="w-40 md:w-48 mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<div className="rounded-md shadow">
								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLScxLqjghEvBveL4L2nMQfscCjA5gRIvLs4Nwl26IPNh9Ix7RQ/viewform"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
									target="_blank"
									rel="noreferrer"
								>
									Join Waitlist
								</a>
							</div>
						</div>
					</div>
				</main>
			</div>

			<div className="hidden md:flex justify-center items-center bg-blue-600 w-1/2">
				<Lucid className="lucid" />
			</div>
		</div>

		<Features />

		<Team />

		<Footer />
    </div>
)

export default Landing