import { Container } from 'react-bootstrap';
import { useAuthContext } from '../context/authContext';

const Home = () => {
	const { isAuthenticated, authInfo } = useAuthContext();
	return (
		<div>
			<Container>
				<div className='my-5'></div>
				<div className='text-center'>
					<h1>
						Welcome{' '}
						<span className='text-primary'>
							{isAuthenticated ? authInfo.user.name : ''}
						</span>
					</h1>
					<h2>
						{isAuthenticated
							? 'Thanks for using our app'
							: 'You need to login or register to use this application'}
					</h2>
				</div>
			</Container>
		</div>
	);
};

export default Home;
