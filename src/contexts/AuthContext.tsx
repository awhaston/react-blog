import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext({});

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(true);

	const value = {
		currentUser,
		signOut,
		login,
	};

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function signOut() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setCurrentUser(user);
			setLoading(false)
		});

		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
