import { Spinner } from 'react-bootstrap';

const SpinnerLoader = () => {
	return (
		<div className='d-flex justify-content-center my-5'>
			<Spinner animation='border' variant='primary' />
		</div>
	);
};

export default SpinnerLoader;
