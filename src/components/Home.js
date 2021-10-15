import { useState } from 'react'
import {
	Switch,
	useRouteMatch,
} from "react-router-dom";

import { PrivateRoute } from '../App';
import Projects from './Projects'
import EditProject from './EditProject'
import Sidebar from './Sidebar'
import { DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes'

const Home = (props) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { path } = useRouteMatch();

	return (
		<div className="relative h-screen flex bg-white">
			<div className="hidden h-screen w-64 lg:block"></div>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<Switch>
				<PrivateRoute exact path={path}>
					<Projects projects={props.projects} setProjects={props.setProjects} setSidebarOpen={setSidebarOpen} />
				</PrivateRoute>
				<PrivateRoute path={`${path}${DEFAULT_COLLECTIONS_ROUTE}/:topicId`}>
					<EditProject />
				</PrivateRoute>
			</Switch>
		</div>
	)
}

export default Home