import { useEffect, useState } from 'react'
import {
	SearchIcon,
	SortAscendingIcon,
	ChevronDownIcon,
} from '@heroicons/react/solid'
import { useRouteMatch } from 'react-router-dom'
import { API, graphqlOperation } from '@aws-amplify/api'

import CollectionRow from './CollectionRow'
import CollectionView from './CollectionView'
import GenerateCollectionPanel from './GenerateCollectionPanel'
import { listCollectionsUnderProject } from '../graphql/queries';
import { PrivateRoute } from '../App';
import Spinner from './Spinner'

const Collections = ({ layers = [], project = {} }) => {
	const { path } = useRouteMatch()

	const [query, setQuery] = useState('')
	const [isPanelOpen, setIsPanelOpen] = useState(false)
	const [collections, setCollections] = useState([])
	const [currentCollection, setCurrentCollection] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const fetchCollections = async (projectId) => {
		setIsLoading(true)

		try {
			console.log('Project Id', projectId)
			const collections = await API.graphql(graphqlOperation(listCollectionsUnderProject, { project_id: projectId }))
			const fetchedCollections = collections?.data?.listCollectionsUnderProject || []

			setCollections(fetchedCollections)
			console.log('Collections', fetchedCollections)
		}
		catch (e) {
			console.log('Error fetching collections:', e)
		}
		finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchCollections(project.id)
	}, [project.id])

	return (
		<div className="h-full w-full text-2xl mt-5">
			<PrivateRoute exact path={path}>
				<div>
					<div className="mb-5 pb-5 sm:flex sm:items-center sm:justify-between">
						<h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
						<div className="mt-3 sm:mt-0 sm:ml-4">
							<label htmlFor="mobile-search-candidate" className="sr-only">
								Search
							</label>
							<label htmlFor="desktop-search-candidate" className="sr-only">
								Search
							</label>
							<div className="flex rounded-md">
								<button
									type="button"
									className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1 sm:ml-3"
									onClick={() => setIsPanelOpen(true)}
								>
									Generate Collection
								</button>
								<div className="relative flex-grow focus-within:z-10">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
									</div>
									<input
										type="text"
										name="mobile-search-candidate"
										id="mobile-search-candidate"
										className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:hidden border-gray-300"
										placeholder="Search"
										onChange={(e) => setQuery(e.target.value)}
									/>
									<input
										type="text"
										name="desktop-search-candidate"
										id="desktop-search-candidate"
										className="hidden focus:ring-blue-500 focus:border-blue-500 w-full rounded-none rounded-l-md pl-10 sm:block sm:text-sm border-gray-300"
										placeholder="Search"
										onChange={(e) => setQuery(e.target.value)}
									/>
								</div>
								<button
									type="button"
									className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
								>
									<SortAscendingIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
									<span className="ml-2">Sort</span>
									<ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center">
						{isLoading && <Spinner />}
						{!isLoading && collections.length <= 0 && (<div className="text-2xl">Oops no collections! Try generating one!</div>)}
						{!isLoading && collections.map((c, idx) => (<CollectionRow key={`collection-${idx}`} collection={c} setCurrentCollection={setCurrentCollection} />))}
					</div>
				</div>
			</PrivateRoute>
			<PrivateRoute path={`${path}/:collectionId`}>
				<CollectionView collection={currentCollection} />
			</PrivateRoute>
			<GenerateCollectionPanel open={isPanelOpen} setOpen={setIsPanelOpen} project={project} layers={layers} />
		</div>
	)
}

export default Collections