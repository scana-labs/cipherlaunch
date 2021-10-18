import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloudUploadIcon } from '@heroicons/react/solid'

const AddCategoryModal = ({ open, setOpen, addCategory }) => {
	const cancelButtonRef = useRef(null)
	const [categoryName, setCategoryName] = useState('')

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
							<div className="mt-3 text-center sm:mt-5">
								<Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900 mb-5">
									Create Layer
								</Dialog.Title>
								<div className="flex flex-col mt-2">
									<div className="w-full h-20 bg-white rounded-lg overflow-hidden mr-3">
										<label className="block text-left text-sm font-medium text-gray-700">
											Layer Name
										</label>
										<div className="mt-1">
											<input
												type="text"
												name="category-name"
												id="category-name"
												className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
												placeholder="Awesome Layer"
												onChange={(e) => setCategoryName(e.target.value)}
											/>
										</div>
									</div>
									<div className="w-full h-20 bg-white rounded-lg overflow-hidden mr-3">
										<label className="block text-left text-sm font-medium text-gray-700">
											Assets (optional)
										</label>
										<div className="mt-1 border border-gray-300 rounded-md">
											<label className="cursor-pointer">
												<div className="flex p-2 items-center justify-between h-9 rounded-md">
													<p className="font-medium text-gray-700">Upload assets</p>
													<CloudUploadIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
												</div>
												<input type="file" className="hidden" />
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-3 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
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
									className={`${categoryName ? '' : 'disabled:opacity-50'} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm`}
									onClick={() => {
										addCategory(categoryName)
										setOpen(false)
									}}
									disabled={!categoryName}
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

export default AddCategoryModal