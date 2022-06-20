import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import useFetch from 'use-http';

interface LoginInputs {
	usernameOrEmail: string;
	password: string;
}

const Login = ({ user }: any) => {
	if (user) {
		return <Navigate to='/' replace />;
	}
	const { post, response, loading } = useFetch(import.meta.env.VITE_API_URL);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit = (data: LoginInputs) => {
		async function postData() {
			const result = await post('/api/auth', data);
			if (response.ok) {
				reset();
				localStorage.setItem('token', result.token);
				toast.success('Login successful');
				window.location.href = '/';
			} else {
				toast.error(result.message);
			}
		}
		postData();
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
						{loading ? 'Please Wait...' : 'Login'}
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
