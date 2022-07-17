import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
	(config: any) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

const useHttpsService = () => {
	const [loading, setLoading] = useState(false);

	const get = (url: string, params?: any) => {
		setLoading(true);
		return axios
			.get(url, { params })
			.then((response) => {
				setLoading(false);
				return response;
			})
			.catch((error) => {
				setLoading(false);
				return error;
			});
	};

	const post = (url: string, data?: any) => {
		setLoading(true);
		return axios
			.post(url, data)
			.then((response) => {
				setLoading(false);
				return response;
			})
			.catch((error) => {
				setLoading(false);
				return error;
			});
	};

	const put = (url: string, data?: any) => {
		setLoading(true);
		return axios
			.put(url, data)
			.then((response) => {
				setLoading(false);
				return response;
			})
			.catch((error) => {
				setLoading(false);
				return error;
			});
	};

	const deleteRequest = (url: string) => {
		setLoading(true);
		return axios
			.delete(url)
			.then((response) => {
				setLoading(false);
				return response;
			})
			.catch((error) => {
				setLoading(false);
				return error;
			});
	};

	return {
		loading,
		get,
		post,
		put,
		del: deleteRequest,
	};
};

export default useHttpsService;
