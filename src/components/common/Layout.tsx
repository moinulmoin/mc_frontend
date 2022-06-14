import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-quill/dist/quill.snow.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const Layout: FC = () => {
	return (
		<div>
			<Toaster position='top-right' reverseOrder={false} />

			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
