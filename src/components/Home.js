import {
	Switch,
	useRouteMatch,
} from "react-router-dom";

import Collections from "./Collections";
import { DEFAULT_COLLECTIONS_ROUTE } from '../constants/Routes'
import EditProject from './EditProject'
import NavBarPrivate from './NavBarPrivate'
import { PrivateRoute } from '../App';
import Projects from './Projects'

const Home = (props) => {
	const { path } = useRouteMatch();

	return (
		<div className="relative h-screen flex bg-white">
			<div className="fixed w-full">
				<NavBarPrivate />
			</div>
			<div className="mt-16 h-full w-full bg-gray-100">
				<div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<Switch>
						<PrivateRoute exact path={path}>
							<Projects projects={props.projects} setProjects={props.setProjects} />
						</PrivateRoute>
						<PrivateRoute exact path={`${path}${DEFAULT_COLLECTIONS_ROUTE}`}>
							<Collections />
						</PrivateRoute>
						<PrivateRoute exact path={`${path}/:projectId`}>
							<EditProject />
						</PrivateRoute>
					</Switch>
				</div>
			</div>
		</div>
	)
}

export default Home