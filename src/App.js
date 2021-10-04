import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import NavBar from './components/NavBar'
import Projects from './components/Projects'
import { DEFAULT_LOGIN_ROUTE, DEFAULT_PROJECTS_ROUTE, DEFAULT_SIGNUP_ROUTE } from './constants/Routes'

import { AuthProvider, useAuth } from './auth'

import './App.css'

const App = () => (
	<AuthProvider>
		<Router>
			<NavBar />
			<Switch>
				<PrivateRoute path={DEFAULT_PROJECTS_ROUTE}>
					<Projects />
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

const PrivateRoute = ({ children, ...rest }) => {
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