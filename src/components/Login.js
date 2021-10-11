import { useHistory, useLocation } from 'react-router-dom'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components'

import { DEFAULT_HOME_ROUTE } from '../constants/Routes'

const Login = () => {
	let history = useHistory();
	let location = useLocation();
  
	const { from } = location.state || { from: { pathname: DEFAULT_HOME_ROUTE } }

	const handleAuthStateChange = (nextAuthState, authData) => {
		console.log(nextAuthState, authData, from)
		if (nextAuthState === AuthState.SignedIn) {
			history.replace(from);
		}
	};

	return (
		<AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange}>
			<AmplifySignIn slot="sign-in" />
			<AmplifySignUp
				slot="sign-up"
				formFields={[
					{ type: 'username' },
					{ type: 'email' },
					{ type: 'password' },
				]}
			/>
		</AmplifyAuthenticator>
	)
}

export default Login