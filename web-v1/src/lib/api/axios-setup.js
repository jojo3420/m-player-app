import axios from 'axios';

const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const HOST = process.env.REACT_APP_URL;

/**
 *
 * @type {AxiosInstance}
 */
const instance = axios.create({
	baseURL: `${PROXY_URL}${HOST}`,
	// timeout: 1000,
	// headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
