import axios from 'axios';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SpinnerLoader from '../components/common/SpinnerLoader';

interface Memory {
	id: string;
	title: string;
	date: string;
	description: string;
	featureImage: string;
}

const Memory = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [memory, setMemory] = useState<Memory>();

	useEffect(() => {
		axios
			.get(`/api/memories/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				setMemory(res.data);
			})
			.catch((err) => toast.error('Failed to load memory'));
	}, []);

	const handleDelete = () => {
		axios
			.delete(`/api/memories/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then(() => {
				toast.success('Deleted Successfully');
				navigate('/memories');
			})
			.catch((err) => {
				toast.error('Failed to delete');
			});
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

export default Memory;
