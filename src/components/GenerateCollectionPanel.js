import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'
import Auth from '@aws-amplify/auth'

import Spinner from './Spinner'

const GenerateCollectionPanel = ({ open, setOpen, generateCollection, project, layers }) => {
	const cancelButtonRef = useRef(null)
	const [numTokens, setNumTokens] = useState(0)
	const [collectionName, setCollectionName] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)

	const invokeCollectionGeneration = async () => {
		let convertedNumTokens = 0

		try {
			if (!isNaN(numTokens) && !isNaN(parseFloat(numTokens))) {
				convertedNumTokens = parseInt(numTokens)
			}
		}
		catch (e) {
			console.log('Error converting num tokens', e)
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
				FunctionName: 'GenerateTokenCollection-dev',
				InvocationType: 'RequestResponse',
				Payload: JSON.stringify({
					'project_id': project.id,
					'project_name': project.name || 'Project',
					'collection_name': collectionName || 'Collection',
					'base_url': 'DUMMY_URL',
					'num_tokens': convertedNumTokens,
				}),
				LogType: 'None',
			}))
			console.log('Lambda Result', result)
		}
		catch (e) {
			console.log('Error invoking lambda', e)
		}
		finally {
			setIsGenerating(false)
		}
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
				<div className="absolute inset-0 overflow-hidden">
					<Dialog.Overlay className="absolute inset-0" />

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-md">
								<div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
									<div className="px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<Dialog.Title className="text-lg font-medium text-gray-900">Panel title</Dialog.Title>
											<div className="ml-3 h-7 flex items-center">
												<button
													type="button"
													className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
													onClick={() => setOpen(false)}
												>
													<span className="sr-only">Close panel</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</div>
										</div>
									</div>
									<div className="mt-6 relative flex-1 px-4 sm:px-6">
										<div>
											<div className="mt-3 text-center sm:mt-5">
												<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
													Generate Collection
												</Dialog.Title>
												<div className="mt-2">
													<label className="block text-left text-sm font-medium text-gray-700">
														Collection Name
													</label>
													<div className="mt-1">
														<input
															type="text"
															name="collection-name"
															id="collection-name"
															className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
															placeholder="Awesome Collection"
															onChange={(e) => setCollectionName(e.target.value)}
														/>
													</div>
												</div>
												<div className="mt-2">
													<label className="block text-left text-sm font-medium text-gray-700">
														Number of Tokens to Generate
													</label>
													<div className="mt-1">
														<input
															type="number"
															name="project-name"
															id="project-name"
															className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
															placeholder="0 - 1000"
															onChange={(e) => setNumTokens(e.target.value)}
														/>
													</div>
												</div>
												<div className="text-lg my-5 leading-6 font-medium text-gray-900">Collection Overview</div>
												{layers.map((l, idx) => {
													return (
														<div key={`invoice-${idx}`} className="bg-white shadow overflow-hidden rounded-md my-3">
															<div className="px-4 py-5 sm:px-6">
																<div className="text-md leading-6 font-medium text-gray-900">{l.name}</div>
															</div>
															<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
																<dl className="sm:divide-y sm:divide-gray-200">
																	{l?.traits?.map((t, i) => (
																		<div key={`trait-invoice-${i}`} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																			<dt className="text-sm font-medium text-gray-500">{t.name}</dt>
																			<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{t.rarity}</dd>
																		</div>
																	))}
																</dl>
															</div>
														</div>
													)
												})}
												<div className="h-8 flex justify-center items-center m-3">
													{isGenerating && (
														<div className="flex justify-center items-center">
															<div className="text-md mr-3">Generating</div>
															<Spinner height={8} width={8} />
														</div>
													)}
												</div>
											</div>
										</div>
										<div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
											<button
												type="button"
												className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
												onClick={() => setOpen(false)}
												ref={cancelButtonRef}
											>
												Cancel
											</button>
											<button
												type="button"
												className={`${numTokens > 0 && collectionName ? '' : 'disabled:opacity-50'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm`}
												onClick={() => {
													invokeCollectionGeneration()
												}}
												disabled={numTokens <= 0 && !collectionName}
											>
												Generate
											</button>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default GenerateCollectionPanel