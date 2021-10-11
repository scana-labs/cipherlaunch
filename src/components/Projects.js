import { Fragment, useCallback, useEffect, useState } from 'react'
import {
	Link,
	useRouteMatch,
} from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify'
import { Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon } from '@heroicons/react/outline'
import {
	ChevronRightIcon,
	DotsVerticalIcon,
	DuplicateIcon,
	PencilAltIcon,
	SearchIcon,
	TrashIcon,
	UserAddIcon,
} from '@heroicons/react/solid'

import CreateProjectModal from './CreateProjectModal'
import MenuItems from './MenuItems'
import { createProject, deleteProject } from '../graphql/mutations'
import { listProjects } from '../graphql/queries'
import { useAuth } from '../auth'
import { DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const colors = ['red', 'blue', 'pink', 'purple', 'indigo', 'yellow', 'green']

const Projects = ({ setSidebarOpen }) => {
	const { user } = useAuth()

	const [projects, setProjects] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const { url } = useRouteMatch();

	const fetchProjects = useCallback(async () => {
		try {
			const projects = await API.graphql(graphqlOperation(listProjects))
			const fetchedProjects = projects?.data?.listProjects || []
			const paddedProjects = fetchedProjects.map(p => ({
				id: p.project_id,
				title: p.name || 'CipherLaunch',
				initials: p.name?.split(' ').slice(0, 2).map(i => i[0]).join('') || 'CL',
				members: [
					{
						name: user.username,
						handle: user.username,
						imageUrl: '',
					},
				],
				totalMembers: 12,
				lastUpdated: 'March 17, 2020',
				pinned: true,
				bgColorClass: `bg-${colors[Math.floor(Math.random() * colors.length)]}-600`,
			}))

			setProjects(paddedProjects)
			console.log('Projects', projects)
		}
		catch (e) {
			console.log('Error fetching projects:', e)
		}
	}, [user]);

	async function addProject(projectName) {
		try {
			// TODO: Fix this, should not be hardcoded
			const newLocalProject = {
				id: `${projects.length + 1}`,
				project_id: `${projects.length + 1}`,
				title: projectName || 'CipherLaunch',
				initials: projectName.name?.split(' ').slice(0, 2).map(i => i[0]).join('') || 'CL',
				members: [
					{
						name: user.username,
						handle: user.username,
						imageUrl: '',
					},
				],
				totalMembers: 1,
				lastUpdated: 'March 17, 2020',
				pinned: true,
				bgColorClass: `bg-${colors[Math.floor(Math.random() * colors.length)]}-600`,
				user_id: '1',
				name: projectName,
			}
			const newProject = {
				project_id: `${projects.length + 1}`,
				user_id: '1',
				name: projectName,
			}
			await API.graphql(graphqlOperation(createProject, { input: newProject }))
			setProjects([...projects, newLocalProject])
		}
		catch (e) {
			console.log('Error adding project:', e)
		}
	}

	async function removeProject(projectId) {
		try {
			await API.graphql(graphqlOperation(deleteProject, { input: projectId }))
			setProjects(projects.filter(p => p.projectId !== projectId))
		}
		catch (e) {
			console.log('Error deleting project:', e)
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [fetchProjects])

	return (
		<div className="flex flex-col w-0 flex-1 overflow-hidden">
			{/* Search header */}
			<div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
				<button
					type="button"
					className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
					onClick={() => setSidebarOpen(true)}
				>
					<span className="sr-only">Open sidebar</span>
					<MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
				</button>
				<div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
					<div className="flex-1 flex">
						<form className="w-full flex md:ml-0" action="#" method="GET">
							<label htmlFor="search-field" className="sr-only">
								Search
							</label>
							<div className="relative w-full text-gray-400 focus-within:text-gray-600">
								<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
									<SearchIcon className="h-5 w-5" aria-hidden="true" />
								</div>
								<input
									id="search-field"
									name="search-field"
									className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
									placeholder="Search"
									type="search"
								/>
							</div>
						</form>
					</div>
					<div className="flex items-center">
						{/* Profile dropdown */}
						<Menu as="div" className="ml-3 relative">
							<div>
								<Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									<span className="sr-only">Open user menu</span>
									<span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
										<span className="text-xl font-medium leading-none text-white">{user.username[0]}</span>
									</span>
								</Menu.Button>
							</div>
							<MenuItems />
						</Menu>
					</div>
				</div>
			</div>
			<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
				{/* Page title & actions */}
				<div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
					<div className="flex-1 min-w-0">
						<h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Home</h1>
					</div>
					<div className="mt-4 flex sm:mt-0 sm:ml-4">
						<button
							type="button"
							className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-0 sm:ml-0"
						>
							Share
						</button>
						<button
							type="button"
							className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1 sm:ml-3"
							onClick={() => setModalOpen(true)}
						>
							Create
					</button>
					</div>
				</div>

				{/* Projects list (only on smallest breakpoint) */}
				<div className="sm:hidden">
					<div className="px-4 sm:px-6">
						<h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
					</div>
					<ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
						{projects.map((project) => (
							<li key={project.id}>
								<a href="/" className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
									<span className="flex items-center truncate space-x-3">
										<span
											className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
											aria-hidden="true"
										/>
										<span className="font-medium truncate text-sm leading-6">
											{project.title}
										</span>
									</span>
									<ChevronRightIcon
										className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
										aria-hidden="true"
									/>
								</a>
							</li>
						))}
					</ul>
				</div>

				{/* Projects table (small breakpoint and up) */}
				<div className="hidden sm:block">
					<div className="align-middle inline-block min-w-full border-b border-gray-200">
						<table className="min-w-full">
							<thead>
								<tr className="border-t border-gray-200">
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span className="lg:pl-2">Project</span>
									</th>
									<th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Members
									</th>
									<th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Last updated
									</th>
									<th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-100">
								{projects.map((project) => (
									<tr key={project.id}>
										<td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
											<div className="flex items-center space-x-3 lg:pl-2">
												<div
													className={classNames(project.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full')}
													aria-hidden="true"
												/>
												<Link to={`${url}${DEFAULT_COLLECTIONS_ROUTE}/${project.id}`} className="truncate hover:text-gray-600">
													<span>
														{project.title}
													</span>
												</Link>
											</div>
										</td>
										<td className="px-6 py-3 text-sm text-gray-500 font-medium">
											<div className="flex items-center space-x-2">
												<div className="flex flex-shrink-0 -space-x-1">
													{project.members.map((member) => (
														<img
															key={member.handle}
															className="max-w-none h-6 w-6 rounded-full ring-2 ring-white"
															src={member.imageUrl}
															alt={member.name}
														/>
													))}
												</div>
												{project.totalMembers > project.members.length ? (
													<span className="flex-shrink-0 text-xs leading-5 font-medium">
														+{project.totalMembers - project.members.length}
													</span>
												) : null}
											</div>
										</td>
										<td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
											{project.lastUpdated}
										</td>
										<td className="pr-6">
											<Menu as="div" className="relative flex justify-end items-center">
												<Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
													<span className="sr-only">Open options</span>
													<DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
												</Menu.Button>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
														<div className="py-1">
															<Menu.Item>
																{({ active }) => (
																	<a
																		href="/"
																		className={classNames(
																			active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
																			'group flex items-center px-4 py-2 text-sm'
																		)}
																	>
																		<PencilAltIcon
																			className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
																			aria-hidden="true"
																		/>
																		Edit
																	</a>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<a
																		href="/"
																		className={classNames(
																			active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
																			'group flex items-center px-4 py-2 text-sm'
																		)}
																	>
																		<DuplicateIcon
																			className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
																			aria-hidden="true"
																		/>
																		Duplicate
																	</a>
																)}
															</Menu.Item>
															<Menu.Item>
																{({ active }) => (
																	<a
																		href="/"
																		className={classNames(
																			active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
																			'group flex items-center px-4 py-2 text-sm'
																		)}
																	>
																		<UserAddIcon
																			className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
																			aria-hidden="true"
																		/>
																		Share
																	</a>
																)}
															</Menu.Item>
														</div>
														<div className="py-1">
															<Menu.Item>
																{({ active }) => (
																	<a
																		href="/"
																		className={classNames(
																			active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
																			'group flex items-center px-4 py-2 text-sm'
																		)}
																		onClick={() => removeProject(project.projectId)}
																	>
																		<TrashIcon
																			className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
																			aria-hidden="true"
																		/>
																		Delete
																	</a>
																)}
															</Menu.Item>
														</div>
													</Menu.Items>
												</Transition>
											</Menu>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<CreateProjectModal open={modalOpen} setOpen={setModalOpen} addProject={addProject} />
			</main>
		</div>
	)
}

export default Projects