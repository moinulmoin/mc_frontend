import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useHistory, useParams } from 'react-router-dom';
import SpinnerLoader from '../components/common/SpinnerLoader';
import useHttpsService from '../services/httpsService';

interface Memory {
	id: string;
	title: string;
	date: string;
	description: string;
	featureImage: string;
}

const SingleMemory = () => {
	const { id }: any = useParams();
	const history = useHistory();

	const { get, loading, del } = useHttpsService();

	const [memory, setMemory] = useState<Memory>();

	useEffect(() => {
		(async function fetch() {
			const result = await get(`/api/memories/${id}`);
			if (result.name === 'AxiosError') {
				return toast.error(result.response.data.message);
			}
			toast.success('Loaded successfully');

			console.log(result.data);
			setMemory(result.data);
		})();
	}, []);

	const handleDelete = async () => {
		const result = await del(`/api/memories/${id}`);
		if (result.name === 'AxiosError') {
			return toast.error(result.response.data.message);
		}
		toast.success('Deleted Successfully');
		history.push('/memories');
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
