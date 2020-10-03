import getInstance from 'lib/api/instance'
import { readToken } from 'lib/localStorage'

const token = readToken()

const instance = getInstance({
  headers: {
    access_token: token,
  },
})
// const URL = ''

export const isAvailable = async (member) => {
  // console.log({ member })
  return await post(`/auth/available`, member)
}
/**
 * Register User
 * @param user: { username, password }
 * @return {Promise<AxiosResponse<any>>}
 */
export const signUp = async (member) => {
  // console.log({ member })
  return await post(`/auth/signup`, member)
}

/**
 *  login request
 * @param user: { username, password }
 * @return {Promise<AxiosResponse<any>>}
 */
export const signIn = async (user) => {
  return await post(`/auth/signin`, user)
}

/**
 * Logout
 * @return {Promise<AxiosResponse<any>>}
 */
export const logout = async () => {
  return await post(`/auth/logout`)
}

/**
 * check login status
 * @return {Promise<AxiosResponse<any>>}
 */
export const checkLogin = async () => {
  return await get(`/auth/check`)
}

export const sendSMS = async ({ to, type }) => {
  return post(`/sms/send`, { to, type })
}

async function get(url) {
  return await instance.get(url)
}
async function post(url, params) {
  return await instance.post(url, params)
}
