import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../components/common/SkeletonLoader';
import useHttpsService from '../services/httpsService';

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
	const { get, loading } = useHttpsService();

	const [memories, setMemories] = useState<Memory[] | null>(null);

	useEffect(() => {
		(async function fetch() {
			const result = await get('/api/memories');
			if (result.name === 'AxiosError') {
				return toast.error(result.response.data.message);
			}
			toast.success('Loaded successfully');
			setMemories(result.data);
		})();
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
					{loading && !memories ? (
						<>
							{ArrayOfSkeletonLoaders.map((loader, index) => (
								<Col key={index} md={6} xl={3} className='mb-5'>
									{loader}
								</Col>
							))}
						</>
					) : memories && memories.length > 0 ? (
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
					) : (
						<div className='text-center'>
							<h3>No Memories, Create some!</h3>
						</div>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default Memories;
