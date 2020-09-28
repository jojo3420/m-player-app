import getInstance from 'lib/api/instance';

/**
 * Register User
 * @param user: { username, password }
 * @return {Promise<AxiosResponse<any>>}
 */
const instance = getInstance({});
const URL = '/v1/auth';

export const signUp = async (user) => {
  return await instance.post(`${URL}/register`, user);
};

/**
 *  login request
 * @param user: { username, password }
 * @return {Promise<AxiosResponse<any>>}
 */
export const login = async (user) => {
  return await instance.post(`${URL}/login`, user);
};

/**
 * Logout
 * @return {Promise<AxiosResponse<any>>}
 */
export const logout = async () => {
  return await instance.post(`${URL}/logout`);
};

/**
 * check login status
 * @return {Promise<AxiosResponse<any>>}
 */
export const checkLogin = async () => {
  return await instance.get(`${URL}/check`);
};
