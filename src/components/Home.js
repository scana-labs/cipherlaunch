import {
	Switch,
	useRouteMatch,
} from "react-router-dom";

import Collections from "./Collections"
import { DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes'
import Project from './Project'
import NavBarPrivate from './NavBarPrivate'
import { PrivateRoute } from '../App'
import Projects from './Projects'

const Home = ({ projects, setProjects }) => {
	const { path } = useRouteMatch()

	return (
		<div className="relative h-screen flex bg-white">
			<div className="fixed w-full" style={{ zIndex: 100 }}>
				<NavBarPrivate />
			</div>
			<div className="mt-16 h-full w-full bg-gray-100">
				<div className="overflow-x-scroll h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Switch>
						<PrivateRoute exact path={path}>
							<Projects projects={projects} setProjects={setProjects} />
						</PrivateRoute>
						<PrivateRoute exact path={`${path}${DEFAULT_COLLECTIONS_ROUTE}`}>
							<Collections />
						</PrivateRoute>
						<PrivateRoute path={`${path}/:projectId`}>
							<Project projects={projects} />
						</PrivateRoute>
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default Home