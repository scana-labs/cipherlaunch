import albert from '../assets/albert.png'
import andrew from '../assets/andrew.png'
import caleb from '../assets/caleb.png'

import './Team.css'

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
		twitter: 'https://twitter.com/UncleDrew1995',
		imageUrl: andrew,
	},
	{
		name: 'Caleb',
		role: 'Engineer',
		background: 'Cal Poly CS, Eng @ EdTech Startup',
		twitter: 'https://twitter.com/calebhskim',
		imageUrl: caleb,
	},
]

const Team = () => (
	<div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
		<div className="flex flex-col justify-center items-center w-fit mb-10 md:mb-24">
			<h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>
			<p className="text-xl text-gray-500 text-center">
				We are silicon valley engineers, Bored Apes, Cool Cats and Veefriends with deep NFT and Web3 experience. Our hybrid approach lets you manage artwork with our generative art software while we advise on the tech, marketing and strategy for your NFT project.
			</p>
		</div>
		<div className="flex flex-wrap items-center justify-center mt-10 lg:col-span-2">
			{people.map((person, idx) => (
				<div
					key={`people-${idx}`}
					className="team-card-sm md:team-card-md bg-white group relative border border-gray-200 rounded-2xl flex flex-col justify-center overflow-hidden mx-5 shadow-xl my-5"
				>
					<div className="flex flex-col justify-center items-center space-x-4 lg:space-x-6 md:p-5 p-2">
						<img className="w-48 h-48 rounded-md" src={person.imageUrl} alt="" />
						<div className="flex flex-col items-center font-medium text-lg">
							<div className="flex flex-col items-center md:h-24 mt-6">
								<h3 className="text-2xl font-bold">{person.name}</h3>
								<p className="text-center text-sm">{person.background}</p>
							</div>
							<p classname="mt-3">{person.role}</p>
							<a className="twitter-btn text-sm md:m-2.5 mt-3" href={person.twitter} target="_blank" rel="noreferrer">
								<svg className="h-6 w-6" fill="#1d9bf0" viewBox="0 0 24 24">
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
								<p className="ml-2">Follow</p>
							</a>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
)

export default Team