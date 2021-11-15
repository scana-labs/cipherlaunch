import { Fragment, useRef, useState, useEffect } from 'react'
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import Auth from '@aws-amplify/auth'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import Storage from '@aws-amplify/storage'

import GenerateImagesModal from './GenerateImagesModal'
import Spinner from './Spinner'

const PAGE_SIZE = 20

const ImagesView = ({ collection }) => {
	const [isGenerating, setIsGenerating] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [tokenUrls, setTokenUrls] = useState([])
	const [currentPage, setCurrentPage] = useState(0)

	const invokeCollectionGeneration = async () => {
		console.log('Generating images...')

		if (!collection || !collection.collection_id || !collection.num_of_tokens) {
			console.log('Unable to generate images: Invalid parameters', collection)
			return
		}

		const REGION = 'us-west-2'

		try {
			setIsGenerating(true)
			const credentials = await Auth.currentCredentials()
			const lambdaClient = new LambdaClient({
				region: REGION,
				credentials: Auth.essentialCredentials(credentials),
			})

			const result = await lambdaClient.send(new InvokeCommand({
				FunctionName: 'GenerateTokenCollectionImages-dev',
				InvocationType: 'RequestResponse',
				Payload: JSON.stringify({
					'project_id': collection.project_id,
					'collection_id': collection.collection_id,
					'num_of_tokens': collection.num_of_tokens,
				}),
				LogType: 'None',
			}))
			console.log('Image Generation Lambda Result', result)
		}
		catch (e) {
			console.log('Error invoking image generation lambda', e)
		}
		finally {
			setIsGenerating(false)
			await fetchUrls()
		}
	}

	const fetchUrls = async (pageNum) => {
		const signedUrls = []
		const currentIndex = PAGE_SIZE * pageNum
		let i = currentIndex 

		while (i < currentIndex + PAGE_SIZE && i < collection.num_of_tokens) {
			const signedUrl = Storage.get(`projects/${collection.project_id}/collections/${collection.collection_id}/token_images/${i}.jpg`)
			signedUrls.push(signedUrl)
			i++
		}

		setTokenUrls(await Promise.all(signedUrls))
	}

	const handlePageChange = (pageNum) => {
		const MAX_PAGE = Math.floor(collection.num_of_tokens / PAGE_SIZE)

		if (pageNum < 0) {
			pageNum = 0
		}
		if (pageNum > MAX_PAGE) {
			pageNum = MAX_PAGE
		}

		setCurrentPage(pageNum)
		fetchUrls(pageNum)
	}

	useEffect(() => {
		if (collection.images_generated) {
			fetchUrls(currentPage)
		}
	}, [collection])

	return (
		<div className="mt-3 h-full w-full flex items-center justify-center">
			{isGenerating && <Spinner />}
			{!collection.images_generated && !isGenerating && <div>
				<button
					type="button"
					className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1 sm:ml-3"
					onClick={() => setIsOpen(true)}
				>
					Generate Images
				</button>
			</div>}
			{collection.images_generated && !isGenerating && <div className="h-full w-full flex flex-col items-center justify-center">
				<div className="flex h-full w-full flex-wrap">
					{tokenUrls.map((url, idx) => (
						<img
							key={`token-image-${idx}`} // TODO: Update this with actual id
							src={url}
							className="rounded-lg w-32 h-32 m-3"
							alt="trait"
						/>
					))}
				</div>
				<nav className="w-full h-full border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
					<div className="-mt-px w-0 flex-1 flex">
						<div
							className="cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
							Previous
						</div>
					</div>
					{[...Array(Math.floor(collection.num_of_tokens / PAGE_SIZE) + 1).keys()].map(k => (
						<div key={`page-${k}`} className="hidden md:-mt-px md:flex">
							<div
								className="cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
								onClick={() => handlePageChange(k)}
							>
								{k + 1}
							</div>
						</div>
					))}
					<div className="-mt-px w-0 flex-1 flex justify-end">
						<div
							className="cursor-pointer border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
							onClick={() => handlePageChange(currentPage + 1)}
						>
							Next
							<ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
						</div>
					</div>
				</nav>
			</div>}
			<GenerateImagesModal open={isOpen} setOpen={setIsOpen} generateImages={invokeCollectionGeneration} />
		</div>
	)
}

export default ImagesView