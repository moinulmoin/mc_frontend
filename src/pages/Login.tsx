import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import useHttpsService from '../services/httpsService';

interface LoginInputs {
	usernameOrEmail: string;
	password: string;
}

const Login = () => {
	const { isAuthenticated } = useAuthContext();
	if (isAuthenticated) {
		return <Redirect to='/' />;
	}

	const { post, loading } = useHttpsService();
	const { setUserAuth } = useAuthContext();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginInputs>();

	const onSubmit = async (data: LoginInputs) => {
		const result = await post('/api/auth', data);
		console.log(result, typeof result);

		if (result.name === 'AxiosError') {
			return toast.error(result.response.data.message);
		}

		reset();
		setUserAuth(result.data.token);
		toast.success('Login successful');
		window.location.href = '/';
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
