import axios from 'axios';


/**
 *
 * @param options: { }
 * @return {AxiosInstance}
 */
function getInstance(options) {
  const instance  = axios.create(options);
  return instance;
}

export default getInstance;
