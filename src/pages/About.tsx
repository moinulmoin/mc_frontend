import { Container } from 'react-bootstrap';

const About = () => {
	return (
		<div>
			<Container>
				<div className='my-5'></div>
				<div className='text-center'>
					<h1 className='mb-5'>About</h1>
					<h3 className='mb-5'>
						This is a simple application that allows you to create,
						update and delete memories. You need to login/register
						to use this application.
					</h3>

					<h5 className='mb-5'>
						The frontend of application is built with React,
						React-Bootstrap, TypeScript and the backend is built
						with Node.js, Express, MongoDB.
					</h5>

					<p>
						Thanks for using -{' '}
						<a
							href='https://github.com/moinulmoin'
							className='primary-link'
						>
							Moinul Moin
						</a>
					</p>
				</div>
			</Container>
		</div>
	);
};

export default About;
