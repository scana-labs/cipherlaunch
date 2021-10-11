import { useState } from 'react'
import {
	Switch,
	Route,
	useRouteMatch,
} from "react-router-dom";

import Projects from './Projects'
import EditProject from './EditProject'
import Sidebar from './Sidebar'
import { DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes'

const Home = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { path } = useRouteMatch();

	return (
		<div className="relative h-screen flex bg-white">
			<div className="h-screen w-64"></div>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<Switch>
				<Route exact path={path}>
					<Projects setSidebarOpen={setSidebarOpen} />
				</Route>
				<Route path={`${path}${DEFAULT_COLLECTIONS_ROUTE}/:topicId`}>
					<EditProject />
				</Route>
			</Switch>
		</div>
	)
}

export default Home