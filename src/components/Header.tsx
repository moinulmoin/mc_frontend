import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Header = () => {
	const { isAuthenticated } = useAuthContext();

	const handleLogout = () => {
		window.location.href = '/';
		localStorage.removeItem('token');
	};

	return (
		<header>
			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand as={Link} to='/'>
						MemoryCapture
					</Navbar.Brand>

					<Navbar.Toggle aria-controls='responsive-navbar' />

					<Navbar.Collapse id='responsive-navbar' className=''>
						<Nav className='mx-lg-auto text-center'>
							<Nav.Link as={NavLink} to='/'>
								Home
							</Nav.Link>
							<Nav.Link as={NavLink} to='/about'>
								About
							</Nav.Link>
							{isAuthenticated && (
								<Nav.Link as={NavLink} to='/memories'>
									Memories
								</Nav.Link>
							)}
						</Nav>

						<div className='ml-lg-auto text-center mt-3 mt-lg-0'>
							{isAuthenticated ? (
								<Button onClick={handleLogout} variant='danger'>
									Logout
								</Button>
							) : (
								<>
									<Link to='/login'>
										<Button variant='dark'>Login</Button>
									</Link>
									<Link to='/register'>
										<Button variant='primary'>
											Register
										</Button>
									</Link>
								</>
							)}
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
