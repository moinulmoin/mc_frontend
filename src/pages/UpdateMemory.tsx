import axios from 'axios';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

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
	const { id } = useParams();
	const navigate = useNavigate();
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
		axios
			.get(`/api/memories/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setValue('title', res.data.title);
				setValue('date', res.data.date);
				setValue('description', res.data.description);
				setValue('featureImage', res.data.featureImage);
			})
			.catch((err) => {
				toast.error(err.response.data);
			});
	}, []);

	const onEditorStateChange = (content: string) => {
		setValue('description', content);
	};

	const editorContent = watch('description');

	const onSubmit = async (data: Memory) => {
		axios
			.put(`/api/memories/${id}`, data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				reset();
				toast.success('Successfully Updated!');
				navigate(-1);
			})
			.catch((err) => {
				toast.error('Failed to Update!');
			});
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
