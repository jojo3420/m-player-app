import getInstance from 'lib/api/instance'

const instance = getInstance()

export const getPlayListBy = async ({ email, page }) => {
  const URL = `/playlist`
  return await instance.get(`${URL}/${email}/${page}`)
}
export const getMediaByPlayListId = async (id) => {
  const URL = `/playlist`
  return await instance.get(`${URL}/${id}`)
}
