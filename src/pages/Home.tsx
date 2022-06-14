import { Container } from 'react-bootstrap';

const Home = ({ user }: any) => {
	return (
		<div>
			<Container>
				<div className='my-5'></div>
				<div className='text-center'>
					<h1>
						Welcome{' '}
						<span className='text-primary'>
							{user ? user.name : ''}
						</span>
					</h1>
					<h2>
						{user
							? 'Thanks for using our app'
							: 'You need to login or register to use this application'}
					</h2>
				</div>
			</Container>
		</div>
	);
};

export default Home;
