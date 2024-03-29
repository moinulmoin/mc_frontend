import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthContext } from '../context/authContext';
import useHttpsService from '../services/httpsService';

interface RegisterInputs {
	name: string;
	username: string;
	email: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(3, 'Name must be at least 3 characters')
		.max(255, 'Name can be maximum 255 characters'),
	username: Yup.string()
		.required('Username is required')
		.min(3, 'Username must be at least 3 characters')
		.max(255, 'Username can be maximum 255 characters')
		.lowercase('Username must be lowercase'),

	email: Yup.string()
		.required('Email is required')
		.email('Email must be valid')
		.max(255, 'Email can be maximum 255 characters')
		.lowercase('Email must be lowercase'),

	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(255, 'Password can be maximum 255 characters'),
});

const Register = () => {
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
	} = useForm<RegisterInputs>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data: RegisterInputs) => {
		const result = await post('/api/users', data);

		if (result.name === 'AxiosError') {
			return toast.error(result.response.data.message);
		}

		reset();
		setUserAuth(result.data.token);
		toast.success('Registration successful');
		window.location.href = '/';
	};

	return (
		<div className='page-height'>
			<Container>
				<Form
					className='w-sm-50 w-lg-30 mx-auto mt-10'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Form.Group className='mb-3' controlId='Name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							{...register('name')}
							className={`${errors.name ? 'is-invalid' : ''}`}
						/>
						{errors.name && (
							<Form.Control.Feedback type='invalid'>
								{errors.name?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='Username'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type='text'
							{...register('username')}
							className={`${errors.username ? 'is-invalid' : ''}`}
						/>
						{errors.username && (
							<Form.Control.Feedback type='invalid'>
								{errors.username?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='Email'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							{...register('email')}
							className={`${errors.email ? 'is-invalid' : ''}`}
						/>
						{errors.email && (
							<Form.Control.Feedback type='invalid'>
								{errors.email?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>

					<Form.Group className='mb-3' controlId='Password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							{...register('password')}
							className={`${errors.password ? 'is-invalid' : ''}`}
						/>
						{errors.password && (
							<Form.Control.Feedback type='invalid'>
								{errors.password?.message}
							</Form.Control.Feedback>
						)}
					</Form.Group>
					<Button variant='primary' type='submit' className='w-100'>
						{loading ? 'Please Wait...' : 'Register'}
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default Register;
