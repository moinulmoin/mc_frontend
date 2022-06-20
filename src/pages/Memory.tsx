import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from 'use-http';
import SpinnerLoader from '../components/common/SpinnerLoader';

interface Memory {
	id: string;
	title: string;
	date: string;
	description: string;
	featureImage: string;
}

const SingleMemory = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { get, response, del } = useFetch(import.meta.env.VITE_API_URL, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	const [memory, setMemory] = useState<Memory>();

	useEffect(() => {
		async function fetchData() {
			const result = await get(`/api/memories/${id}`);
			if (!response.ok) {
				return toast.error('Something went wrong');
			}
			setMemory(result);
		}
		fetchData();
	}, []);

	const handleDelete = async () => {
		await del(`/api/memories/${id}`);
		if (!response.ok) {
			return toast.error('Something went wrong');
		}
		toast.success('Deleted Successfully');
		navigate('/memories');
	};

	if (!memory) return <SpinnerLoader />;

	return (
		<div>
			<Container>
				<div className='my-5' />
				<Row className='justify-content-lg-between'>
					<Col lg={3} className=' order-lg-1'>
						<div className='d-flex flex-lg-column gap-3 mb-3'>
							<Link
								to={`/update/memories/${id}`}
								className='btn btn-primary'
							>
								Update
							</Link>
							<button
								className='btn btn-danger'
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</Col>
					<Col lg={9}>
						<div>
							<div>
								<LazyLoadImage
									effect='blur'
									src={memory.featureImage}
									alt=''
									className='img-fluid '
								/>
							</div>
							<div className=''>
								<span className='fw-bold date mt-2 mb-4 d-inline-block'>
									{dayjs(memory.date).format('DD MMM YYYY')}
								</span>
								<h1 className='mb-4'>{memory.title}</h1>
								<div>{parse(memory.description)}</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SingleMemory;
