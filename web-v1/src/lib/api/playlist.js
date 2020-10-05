import getInstance from 'lib/api/instance'

const instance = getInstance()
const URL = `/playlist`

export const getPlayListBy = async (id) => {
  return await instance.get(`${URL}/${id}`)
}
