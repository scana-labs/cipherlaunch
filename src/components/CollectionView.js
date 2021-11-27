import { useState, useEffect } from 'react'
import {
	ChartPieIcon,
	PhotographIcon,
	SparklesIcon,
} from '@heroicons/react/solid'
import { Link, useLocation, useParams, useRouteMatch, Switch } from 'react-router-dom'
import Storage from '@aws-amplify/storage'

import classNames from '../util/classNames'
import { DEFAULT_PROJECTS_ROUTE } from '../constants/Routes'
import { PrivateRoute } from '../App';
import ImagesView from './ImagesView'
import MetricsView from './MetricsView'
import TokensView from './TokensView'

const CollectionView = ({ collection }) => {
	const { projectId } = useParams() // Extract project_id from path
	const { pathname } = useLocation()
	const { path } = useRouteMatch()

	const [tokens, setTokens] = useState([])
	const [distribution, setDistribution] = useState({})
	const [nav, setNav] = useState([{ name: 'Edit Project', href: `${DEFAULT_PROJECTS_ROUTE}/${projectId}`, current: true }])
	const [tabs, setTabs] = useState([
		{ name: 'Token Metadata', href: '/tokens', icon: SparklesIcon, current: true },
		{ name: 'Metrics', href: '/metrics', icon: ChartPieIcon, current: false },
		{ name: 'Images', href: '/images', icon: PhotographIcon, current: false },
	])

	const fetchTokenMetadata = async () => {
		try {
			const tokenFilePaths = await Storage.list(`projects/${projectId}/collections/${collection.collection_id}/metadata`)
			const signedTokenUrls = await Promise.all(tokenFilePaths.map(t => {
				return Storage.get(t.key) // TODO: Update Storage options
			}))
			const tokenReponses = await Promise.all(signedTokenUrls.map(url => {
				return fetch(url)
			}))
			const tokens = await Promise.all(tokenReponses.map(res => res.json()))

			setTokens(tokens)
			console.log('Tokens', tokens)
		}
		catch (e) {
			console.log('Error fetching token metadata', e)
		}
	}

	const fetchTokenDistribution = async () => {
		const distributionFilePath = await Storage.get(`projects/${projectId}/collections/${collection.collection_id}/trait-counts/trait-distribution.json`)
		const distributionRes = await fetch(distributionFilePath)
		const distribution = await distributionRes.json()

		setDistribution(distribution)
		console.log('Distribution', distribution)
	}

	useEffect(() => {
		fetchTokenMetadata()
		fetchTokenDistribution()
	}, [])

	return (
		<div className="flex flex-col flex-1 m-5">
			<div className="text-2xl">{collection.name || 'Collection'}</div>
			<div className="mt-3">
				<div className="sm:hidden">
					<label htmlFor="tabs" className="sr-only">
						Select a tab
					</label>
					{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
					<select
						id="tabs"
						name="tabs"
						className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
						defaultValue={tabs.find((tab) => tab.current).name}
					>
						{tabs.map((tab) => (
							<option key={tab.name}>{tab.name}</option>
						))}
					</select>
				</div>
				<div className="hidden sm:block">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex space-x-8" aria-label="Tabs">
							{tabs.map((tab) => (
								<Link
									key={tab.name}
									to={pathname.split('/').slice(0, -1).join('/') + tab.href}
									className={classNames(
										tab.current
											? 'border-blue-500 text-blue-600'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
										'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
									)}
									aria-current={tab.current ? 'page' : undefined}
									onClick={() => {
										let newTabs = [...tabs]
										newTabs = newTabs.map(t => {
											t.current = false
											return t
										})
										newTabs.filter(t => t.name === tab.name)[0].current = true
										setTabs(newTabs)
									}}
								>
									<tab.icon
										className={classNames(
											tab.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
											'-ml-0.5 mr-2 h-5 w-5'
										)}
										aria-hidden="true"
									/>
									<span>{tab.name}</span>
								</Link>
							))}
						</nav>
					</div>
				</div>
			</div>
			<Switch>
				<PrivateRoute exact path={`${path}/tokens`}>
					<TokensView tokens={tokens} />
				</PrivateRoute>
				<PrivateRoute exact path={`${path}/metrics`}>
					<MetricsView distribution={distribution} />
				</PrivateRoute>
				<PrivateRoute exact path={`${path}/images`}>
					<ImagesView collection={collection} />
				</PrivateRoute>
			</Switch>
		</div>
	)
}

export default CollectionView