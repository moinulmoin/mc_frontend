import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

interface LoginInputs {
	usernameOrEmail: string;
	password: string;
}

const Login = ({ user }: any) => {
	if (user) {
		return <Navigate to='/' replace />;
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit = async (data: LoginInputs) => {
		try {
			const res = await axios.post('/api/auth', data, {
				headers: {
					'Content-Type': 'application/json',
				},
				data,
			});
			reset();
			const jwt = res.headers.authorization.split(' ')[1];
			localStorage.setItem('token', jwt);
			toast.success('Login successful');
			window.location.href = '/';
		} catch (err: any) {
			toast.error(err.response.data);
		}
	};
	return (
		<div className='page-height'>
			<Container>
				<Form
					onSubmit={handleSubmit(onSubmit)}
					className='w-sm-50 w-lg-30 mx-auto mt-10'
				>
					<Form.Group className='mb-3' controlId='UsernameOrEmail'>
						<Form.Label>Username or Email address</Form.Label>
						<Form.Control
							type='text'
							{...register('usernameOrEmail', { required: true })}
							className={`${
								errors.usernameOrEmail ? 'is-invalid' : ''
							}`}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='Password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							className={`${errors.password ? 'is-invalid' : ''}`}
							{...register('password', {
								required: true,
							})}
						/>
					</Form.Group>
					<Button variant='primary' type='submit' className='w-100'>
						Login
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
