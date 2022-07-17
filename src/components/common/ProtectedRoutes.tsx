import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { isAuthenticated } = useAuthContext();

	if (!isAuthenticated) {
		return <Redirect to='/' />;
	}

	return children;
};

export default ProtectedRoute;
