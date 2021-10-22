import { useState } from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom'
import Amplify from 'aws-amplify';

import awsconfig from './aws-exports'
import { AuthProvider, useAuth } from './auth'
import Landing from './components/Landing'
import Login from './components/Login'
import Home from './components/Home'
import { DEFAULT_LOGIN_ROUTE, DEFAULT_PROJECTS_ROUTE } from './constants/Routes'

import './App.css'

Amplify.configure(awsconfig);

const App = () => {
	const [projects, setProjects] = useState([]) // TODO: Move this to GraphQL

	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute path={DEFAULT_PROJECTS_ROUTE}>
						<Home projects={projects} setProjects={setProjects} />
					</PrivateRoute>
					<Route path={DEFAULT_LOGIN_ROUTE}>
						<Login />
					</Route>
					<Route path="/">
						<Landing />
					</Route>
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export const PrivateRoute = ({ children, ...rest }) => {
	let auth = useAuth();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.user ? (
					children
				) : (
						<Redirect
							to={{
								pathname: DEFAULT_LOGIN_ROUTE,
								state: { from: location }
							}}
						/>
					)
			}
		/>
	);
}

export default App