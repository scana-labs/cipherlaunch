import { ReactComponent as Lucid } from './assets/lucid.svg'

import albert from './assets/albert.png'
import andrew from './assets/andrew.png'
import caleb from './assets/caleb.png'

import './App.css'

const people = [
	{
		name: 'Albert',
		role: 'PM and community lead',
		background: 'Stanford CS, PM @ LogDNA',
		twitter: 'https://twitter.com/azfnft',
		imageUrl: albert,
	},
	{
		name: 'Andrew',
		role: 'Engineer',
		background: 'UC Berkeley CS, Eng @ Amazon',
		imageUrl: andrew,
	},
	{
		name: 'Caleb',
		role: 'Engineer',
		background: 'Cal Poly CS, Eng @ EdTech Startup, Prev @ Microsoft',
		imageUrl: caleb,
	},
]

const navigation = {
	social: [
		{
			name: 'Twitter',
			href: 'https://twitter.com/CipherLaunch',
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			),
		},
	],
 }

const features = [
	{
		name: 'Easily manage and generate assets',
		description: 'Prototype, design, and generate your assets all in one place',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎨</text></svg>,
	},
	{
		name: 'No-code smart contract',
		description: 'We work with you to develop and deploy the smart contract you want so you can focus on what you love',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📜</text></svg>,
	},
	{
		name: 'Managing your community',
		description: 'Automate updates, track numbers, and integrate with your favorite community tools all in one place',
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏛</text></svg>,
	},
]
  
const App = () => (
	<div className="relative bg-white overflow-hidden">
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
						<p className="text-2xl text-red-500">🚀 Cipher Launch 🚀</p>
						<br />
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

		{/* Features */}
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

		{/* Team */}
		<div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
				<div className="space-y-5 sm:space-y-4">
					<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>
					<p className="text-xl text-gray-500">
					We're a group of creators and engineers who are passionate about the NFT community and want to make NFTs accessible to every person, team, and organization.
					</p>
				</div>
				<div className="lg:col-span-2">
					<ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
					{people.map((person) => (
						<li key={person.name}>
						<div className="flex items-center space-x-4 lg:space-x-6">
							<img className="w-16 h-16 rounded-full lg:w-20 lg:h-20" src={person.imageUrl} alt="" />
							<div className="font-medium text-lg leading-6 space-y-1">
								<div className="flex">
									<h3>{person.name}</h3>
									{person.twitter && <a className="flex justify-center items-center ml-1 h-7 w-7 rounded-full hover:bg-gray-300" href={person.twitter} target="_blank" rel="noreferrer">
										<svg className="h-6 w-6" fill="#1d9bf0" viewBox="0 0 24 24">
											<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
										</svg>
									</a>}
								</div>
								<p className="text-indigo-600">{person.role}</p>
								<p>{person.background}</p>
							</div>
						</div>
						</li>
					))}
					</ul>
				</div>
			</div>
		</div>

		<footer className="bg-white">
			<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
				<div className="mt-8 flex justify-center space-x-6">
					{navigation.social.map((item) => (
						<a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
						<span className="sr-only">{item.name}</span>
						<item.icon className="h-6 w-6" aria-hidden="true" />
						</a>
					))}
				</div>
				<p className="mt-8 text-center text-base text-gray-400">&copy; 2021 Cipher Launch, Inc. All rights reserved.</p>
			</div>
		</footer>
    </div>
)

export default App