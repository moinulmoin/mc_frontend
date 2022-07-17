import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthContext {
	authInfo: {
		token: string;
		user: any;
	};
	setUserAuth: (token: string) => void;
	isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext>(null as any);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [authInfo, setAuthInfo] = useState({ token: '', user: null });

	const isAuthenticated = Boolean(authInfo.token);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decoded = jwtDecode(token);
			if (!authInfo.token && !authInfo.user) {
				setAuthInfo({ token, user: decoded as any });
			}
		}
	});

	const setUserAuth = (token: string) => {
		if (token) {
			localStorage.setItem('token', token);
			const decoded = jwtDecode(token);
			setAuthInfo({ token, user: decoded as any });
		}
	};

	return (
		<Provider
			value={{
				authInfo,
				setUserAuth,
				isAuthenticated,
			}}
		>
			{children}
		</Provider>
	);
};

const useAuthContext = () => {
	const data = useContext<IAuthContext>(AuthContext);
	if (data === undefined) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return data;
};

export { useAuthContext, AuthProvider };
