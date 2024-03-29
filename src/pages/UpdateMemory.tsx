import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { useHistory, useParams } from 'react-router-dom';
import useHttpsService from '../services/httpsService';

interface Memory {
	id?: string;
	title: string;
	date: string;
	description: string;
	featureImage: string;
}

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['link', 'image', 'video'],
		['clean'],
	],
};

const UpdateMemory = () => {
	const { id }: any = useParams();
	const history = useHistory();

	const { put, get, loading } = useHttpsService();
	// const { put, response, get } = useFetch(import.meta.env.VITE_API_URL, {
	// 	headers: {
	// 		Authorization: `Bearer ${localStorage.getItem('token')}`,
	// 	},
	// });
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<Memory>();

	useEffect(() => {
		register('description', { required: true });
	}, [register]);

	useEffect(() => {
		async function fetchData() {
			const result = await get(`/api/memories/${id}`);
			if (result.name === 'AxiosError') {
				return toast.error(result.response.data.message);
			}
			setValue('title', result.data.title);
			setValue('date', result.data.date);
			setValue('description', result.data.description);
			setValue('featureImage', result.data.featureImage);
		}
		fetchData();
	}, []);

	const onEditorStateChange = (content: string) => {
		setValue('description', content);
	};

	const editorContent = watch('description');

	const onSubmit = (data: Memory) => {
		async function updateData() {
			const result = await put(`/api/memories/${id}`, data);
			console.log(result);
			if (result.name === 'AxiosError') {
				if (
					result.response.data.message ===
					`"date" must be less than or equal to "now"`
				) {
					return toast.error('Date must be in the past');
				}
				return toast.error(result.response.data.message);
			}
			reset();
			toast.success('Successfully Updated!');
			history.push('/memories');
		}
		updateData();
	};
	return (
		<div>
			<Container>
				<Row>
					<Col md={10} lg={6} className='mx-auto'>
						<h1 className='text-center my-3'>Update your memory</h1>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className='mb-3' controlId='Title'>
								<Form.Label>Title</Form.Label>
								<Form.Control
									type='text'
									{...register('title', { required: true })}
									className={errors.title ? 'is-invalid' : ''}
								/>
							</Form.Group>
							<Form.Group
								className='mb-3'
								controlId='FeatureImage'
							>
								<Form.Label>Feature Image</Form.Label>
								<Form.Control
									type='text'
									{...register('featureImage')}
									readOnly
								/>
							</Form.Group>

							<Form.Group
								className='mb-3'
								controlId='Description'
							>
								<Form.Label>Description</Form.Label>
								<ReactQuill
									modules={modules}
									theme='snow'
									value={editorContent}
									onChange={onEditorStateChange}
									className={
										errors.description ? 'is-invalid' : ''
									}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='Date'>
								<Form.Label>Date</Form.Label>
								<Form.Control
									type='date'
									{...register('date', { required: true })}
									className={errors.date ? 'is-invalid' : ''}
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								save
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default UpdateMemory;
