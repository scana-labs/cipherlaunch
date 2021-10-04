import React, { useState, useEffect, useContext, createContext } from 'react'
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

const authContext = createContext();

// Provider component that wraps app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
	const auth = useProvideAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext)

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
	const [user, setUser] = useState(null);
	const [authState, setAuthState] = React.useState();

	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => onAuthUIStateChange((nextAuthState, authData) => {
		setAuthState(nextAuthState);
		setUser(authData)
	}), []);

	// Return the user object and auth methods
	return {
	  user,
	  authState,
	};
}