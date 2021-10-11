import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import Home from './components/Home'
import { DEFAULT_LOGIN_ROUTE, DEFAULT_HOME_ROUTE } from './constants/Routes'

import { AuthProvider, useAuth } from './auth'

import './App.css'

const App = () => (
	<AuthProvider>
		<Router>
			<Switch>
				<PrivateRoute path={DEFAULT_HOME_ROUTE}>
					<Home />
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