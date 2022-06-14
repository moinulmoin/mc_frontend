import ContentLoader from 'react-content-loader';

const SkeletonLoader = () => (
	<ContentLoader
		speed={2}
		width={306}
		height={299}
		viewBox='0 0 306 299'
		backgroundColor='#e6e6e6'
		foregroundColor='#ecebeb'
	>
		<rect x='10' y='260' rx='3' ry='3' width='410' height='10' />
		<rect x='10' y='226' rx='3' ry='3' width='120' height='7' />
		<rect x='0' y='0' rx='3' ry='3' width='357' height='202' />
		<rect x='15' y='299' rx='3' ry='3' width='100' height='35' />
	</ContentLoader>
);

export default SkeletonLoader;
