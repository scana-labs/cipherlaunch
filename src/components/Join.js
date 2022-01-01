import './Join.css'

const Join = () => (
	<div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
		<div className="flex flex-col justify-center items-center">
			<h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">Join the Waitlist</h2>
			<div className="join-content flex justify-center items-center p-11 bg-white rounded-3xl shadow-xl">
				<div className="flex flex-col">
					<p className="text-2xl text-black-900 mb-2">
						Cipher Launch is changing the game
					</p>
					<p className="text-xl text-gray-500">
						Manage all of your collections and engage all of your communities with a single platform.
					</p>
				</div>
				<a
					className="join-content-btn"
					href="https://docs.google.com/forms/d/e/1FAIpQLScxLqjghEvBveL4L2nMQfscCjA5gRIvLs4Nwl26IPNh9Ix7RQ/viewform"
					target="_blank"
					rel="noreferrer"
				>
					Join Waitlist
				</a>
			</div>
		</div>
	</div>
)

export default Join