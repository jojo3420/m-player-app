import getInstance from 'lib/api/instance'

const instance = getInstance()
const URL = `/playlist`

export const getPlayListBy = async ({ email, page }) => {
  return await instance.get(`${URL}/${email}/${page}`)
}
