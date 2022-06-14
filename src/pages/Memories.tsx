import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/common/SkeletonLoader';

interface Memory {
	_id: string;
	title: string;
	date: string;
	desc: string;
	featureImage: string;
}

const ArrayOfSkeletonLoaders = Array.from({ length: 8 }, () => (
	<SkeletonLoader />
));

const Memories = () => {
	const [loading, setLoading] = useState(true);
	const [memories, setMemories] = useState<Memory[]>([]);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_URL + '/api/memories', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.length === 0) {
					throw new Error('No memories found');
				}
				setMemories(res);
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<Container>
				<div className='my-5'>
					<div className='text-end'>
						<Link to='/new' className='btn btn-danger'>
							Capture New Memory
						</Link>
					</div>
				</div>
				<Row className=''>
					{loading ? (
						<>
							{ArrayOfSkeletonLoaders.map((loader, index) => (
								<Col key={index} md={6} xl={3} className='mb-5'>
									{loader}
								</Col>
							))}
						</>
					) : (
						<>
							{memories.map((memory) => (
								<Col
									md={6}
									xl={3}
									className='mb-5'
									key={memory._id}
								>
									<div className='card'>
										{/* <img /> */}
										<LazyLoadImage
											src={memory.featureImage}
											effect='blur'
											className='card-img-top'
											alt='...'
											width='100%'
											height='230px'
										/>
										<div className='card-body'>
											<span className='text-muted date'>
												{dayjs(memory.date).format(
													'DD MMM YYYY'
												)}
											</span>
											<Link
												to={/memories/ + memory._id}
												className='text-decoration-none'
											>
												<h5 className='card-title'>
													{memory.title}
												</h5>
											</Link>
										</div>
									</div>
								</Col>
							))}
						</>
					)}
					{memories.length === 0 && !loading && (
						<div className='text-center'>
							<h3>Create some!</h3>
						</div>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default Memories;
