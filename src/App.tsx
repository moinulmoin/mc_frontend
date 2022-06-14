import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoutes';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Memories from './pages/Memories';
import Memory from './pages/Memory';
import NewMemory from './pages/NewMemory';
import Register from './pages/Register';
import UpdateMemory from './pages/UpdateMemory';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(
	() => {},
	(error) => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			toast.error('An unexpected error occurrred.');
		}

		return Promise.reject(error);
	}
);

function App() {
	const [user, setUser] = useState<any>();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwtDecode(token);
			setUser(user);
		} else {
			setUser(null);
		}
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home user={user} />} />
				<Route path='about' element={<About />} />
				<Route
					path='memories'
					element={
						<ProtectedRoute user={user}>
							<Memories />
						</ProtectedRoute>
					}
				/>
				<Route
					path='new'
					element={
						<ProtectedRoute user={user}>
							<NewMemory />
						</ProtectedRoute>
					}
				/>
				<Route
					path='update/memories/:id'
					element={
						<ProtectedRoute user={user}>
							<UpdateMemory />
						</ProtectedRoute>
					}
				/>
				<Route
					path='memories/:id'
					element={
						<ProtectedRoute user={user}>
							<Memory />
						</ProtectedRoute>
					}
				/>
				<Route path='login' element={<Login user={user} />} />
				<Route path='register' element={<Register user={user} />} />
				<Route path='*' element={<Home user={user} />} />
			</Route>
		</Routes>
	);
}

export default App;
