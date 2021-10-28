import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloudUploadIcon } from '@heroicons/react/solid'

import isNumeric from '../util/isNumeric'

const AddTraitModal = ({ layerIdToModify, open, setOpen, addTrait }) => {
	const cancelButtonRef = useRef(null)
	const [imageFiles, setImageFiles] = useState([])
	const [traitName, setTraitName] = useState('')
	const [rarity, setRarity] = useState(0)

	const clearInputFields = () => {
		// Reset input fields
		document.getElementById('trait-name').value = ''
		document.getElementById('trait-rarity').value = ''
	}

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div>
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900 mb-5">
										Create Trait
									</Dialog.Title>
									<div className="flex flex-col mt-2">
										<div className='w-full h-20 bg-white rounded-lg overflow-hidden mr-3'>
											<label className="block text-left text-sm font-medium text-gray-700">
												Name
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="trait-name"
													id="trait-name"
													className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
													placeholder="Awesome trait"
													onChange={(e) => setTraitName(e.target.value)}
												/>
											</div>
										</div>
										<div className='w-full h-20 bg-white rounded-lg overflow-hidden mr-3'>
											<label className="block text-left text-sm font-medium text-gray-700">
												Rarity
											</label>
											<div className="mt-1 flex">
												<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
													%
												</span>
												<input
													type="text"
													name="trait-rarity"
													id="trait-rarity"
													className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
													placeholder="Trait Percentage e.g. %5"
													onChange={(e) => setRarity(e.target.value)}
												/>
											</div>
										</div>
										<div className='w-full h-20 bg-white rounded-lg overflow-hidden mr-3'>
											<label className="block text-left text-sm font-medium text-gray-700">
												Asset(s) (optional)
											</label>
											<div className="mt-1 border border-gray-300 rounded-md">
												<label className="cursor-pointer">
													<div className="flex p-2 items-center justify-between h-9 border-dotted border-gray-300 rounded-md">
														<p className="font-medium text-gray-700">{imageFiles.length >= 1 ? `${imageFiles.map(i => i.name).join(',')}` : 'Choose image(s)'}</p>
														<CloudUploadIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
													</div>
													<input
														id="trait-image"
														type="file"
														multiple
														className="hidden"
														onClick={() => document.getElementById('trait-image').value = null}
														onChange={(e) => {
															if (e.target.files.length > 0) {
																setImageFiles(Array.from(e.target.files))
															}
															else {
																console.log('Error selecting files for trait input')
															}
														}}
													/>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
									onClick={() => {
										clearInputFields()
										setOpen(false)
									}}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
								<button
									type="button"
									className={`${traitName ? '' : 'disabled:opacity-50'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm`}
									onClick={() => {
										if (traitName && isNumeric(rarity)) {
											addTrait(traitName, rarity, layerIdToModify, imageFiles)
											clearInputFields()
											setOpen(false)
										}
										else {
											alert('Error: Rarity is not a number') // TODO: Update this to be a notification
										}
									}}
									disabled={!traitName}
								>
									Create
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default AddTraitModal