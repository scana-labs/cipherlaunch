import { Fragment, useCallback, useEffect, useState } from 'react'
import {
	Link,
} from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify'
import { Menu, Transition } from '@headlessui/react'
import {
	ChevronRightIcon,
	DotsVerticalIcon,
	DuplicateIcon,
	PencilAltIcon,
	TrashIcon,
	UserAddIcon,
} from '@heroicons/react/solid'

import classNames from '../util/classNames'
import CreateProjectModal from './CreateProjectModal'
import { createProject, deleteProject } from '../graphql/mutations'
import { listProjectsUnderUser } from '../graphql/queries'
import { useAuth } from '../auth'
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PROJECTS_ROUTE } from '../constants/Routes';
import Spinner from './Spinner'

const colors = ['red', 'blue', 'pink', 'purple', 'indigo', 'yellow', 'green']

const Projects = ({ projects, setProjects }) => {
	const { user } = useAuth()
	const [modalOpen, setModalOpen] = useState(false)
	const [isSpinning, setIsSpinning] = useState(true)

	const fetchProjects = useCallback(async () => {
		try {
			const projects = await API.graphql(graphqlOperation(listProjectsUnderUser, { user_id: user.attributes.sub }))
			const fetchedProjects = projects?.data?.listProjectsUnderUser || []
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
			setIsSpinning(false)
			console.log('Projects', projects)
		}
		catch (e) {
			console.log('Error fetching projects:', e)
		}
	}, [setProjects, user]);

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
				project_id: uuidv4(),
				user_id: user.attributes.sub,
				name: projectName,
				create_timestamp: new Date().toISOString().replace('Z', '')
			}
			await API.graphql(graphqlOperation(createProject, { createProjectInput: newProject }))
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
		<div className="h-full flex flex-col flex-1 overflow-hidden">
			<main className="h-full flex-1 relative z-0 focus:outline-none">
				{/* Page title & actions */}
				<div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
					<div className="flex-1 min-w-0">
						<h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Projects</h1>
					</div>
					<div className="mt-4 flex sm:mt-0 sm:ml-4">
						<button
							type="button"
							className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:order-1 sm:ml-3"
							onClick={() => setModalOpen(true)}
						>
							Create Project
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
				<div className="h-full hidden sm:block">
					<div className="h-full align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
						{isSpinning && <Spinner />}
						{!isSpinning && <table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<span className="lg:pl-2">Project</span>
									</th>
									<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Members
									</th>
									<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Last updated
									</th>
									<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
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
												<Link to={`${DEFAULT_PROJECTS_ROUTE}/${project.id}`} className="truncate hover:text-gray-600">
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
														<span
															key={member.handle}
															className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
														>
															<span className="text-xl font-medium leading-none text-white">{member.name[0] || ''}</span>
														</span>
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
																		href={DEFAULT_PROJECTS_ROUTE}
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
																		href={DEFAULT_PROJECTS_ROUTE}
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
																		href={DEFAULT_PROJECTS_ROUTE}
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
																		href={DEFAULT_PROJECTS_ROUTE}
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
						</table>}
					</div>
				</div>
				<CreateProjectModal open={modalOpen} setOpen={setModalOpen} addProject={addProject} />
			</main>
		</div>
	)
}

export default Projects