import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
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
							{user && (
								<Nav.Link as={NavLink} to='/memories'>
									Memories
								</Nav.Link>
							)}
						</Nav>

						<div className='ml-lg-auto text-center mt-3 mt-lg-0'>
							{user ? (
								<Link to='/logout' onClick={handleLogout}>
									<Button variant='danger'>Logout</Button>
								</Link>
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
