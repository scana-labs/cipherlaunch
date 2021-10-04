import albert from '../assets/albert.png'
import andrew from '../assets/andrew.png'
import caleb from '../assets/caleb.png'

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
  
const Team = () => (
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
)

export default Team