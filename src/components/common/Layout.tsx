import { Toaster } from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-quill/dist/quill.snow.css';
import Header from '../Header';

const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<div>
			<Toaster position='top-right' reverseOrder={false} />

			<Header />
			{children}
		</div>
	);
};

export default Layout;
