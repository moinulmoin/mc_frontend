import { Route, Switch } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoutes';
import { AuthProvider } from './context/authContext';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Memories from './pages/Memories';
import Memory from './pages/Memory';
import NewMemory from './pages/NewMemory';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UpdateMemory from './pages/UpdateMemory';

function App() {
	return (
		<AuthProvider>
			<Layout>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/about'>
						<About />
					</Route>
					<Route exact path='/memories'>
						<ProtectedRoute>
							<Memories />
						</ProtectedRoute>
					</Route>
					<Route exact path='/new'>
						<ProtectedRoute>
							<NewMemory />
						</ProtectedRoute>
					</Route>
					<Route exact path='/update/memories/:id'>
						<ProtectedRoute>
							<UpdateMemory />
						</ProtectedRoute>
					</Route>
					<Route exact path='/memories/:id'>
						<ProtectedRoute>
							<Memory />
						</ProtectedRoute>
					</Route>
					<Route exact path='/login'>
						<Login />
					</Route>
					<Route exact path='/register'>
						<Register />
					</Route>
					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</Layout>
		</AuthProvider>
	);
}

export default App;
