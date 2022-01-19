import './Join.css'

const Join = () => (
	<div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
		<div className="flex flex-col justify-center items-center">
			<h2 className="mb-5 lg:mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">Interested? Join the Waitlist or DM us on Twitter</h2>
			<div className="lg:join-content flex flex-wrap lg:flex-nowrap justify-center items-center p-5 lg:p-11 bg-white rounded-3xl shadow-xl border border-gray-200">
				<div className="flex flex-col m">
					<p className="text-2xl text-black-900 mb-2">
						NFTs + Software + Experts	
					</p>
					<p className="text-xl text-gray-500">
						Manage all of your collections and engage all of your communities with a single platform.
					</p>
				</div>
				<a
					className="join-content-btn my-5 md:my-0"
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