import axios from 'axios';
import { useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';

interface Memory {
	id?: string;
	title: string;
	date: string;
	description: string;
	featureImage: File[];
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

const NewMemory = () => {
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

	const onEditorStateChange = (content: string) => {
		setValue('description', content);
	};

	const editorContent = watch('description');

	const onSubmit = async (data: Memory) => {
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('date', data.date);
		formData.append('description', data.description);
		formData.append('featureImage', data.featureImage[0]);

		axios
			.post('/api/memories', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				reset();
				toast.success('Successfully Saved!');
				navigate('/memories');
			})
			.catch((err) => {
				toast.error(err.response.data);
			});
	};
	return (
		<div>
			<Container>
				<Row>
					<Col md={10} lg={6} className='mx-auto'>
						<h1 className='text-center my-3'>
							Capture a new memory
						</h1>
						<Form
							encType='multipart/form-data'
							onSubmit={handleSubmit(onSubmit)}
						>
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
									type='file'
									accept='image/png, image/jpeg, image/jpg'
									{...register('featureImage', {
										required: true,
									})}
									className={
										errors.featureImage ? 'is-invalid' : ''
									}
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

export default NewMemory;
