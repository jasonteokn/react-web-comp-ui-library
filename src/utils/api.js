import { httpGet, httpPost, httpPostFormData } from './http'

//Add API prefix
const apiPrefix = ''

const min = 60 * 1000
const hour = 60 * min
const day = 24 * hour

const makePromise = async (fetchObj) => {
  const promise = fetchObj.action()
  promise.cancel = fetchObj.abort

  return promise
}

//API Sample
export const authApi = {
  id: 'auth',
  post: {
    fetch: ({ queryKey }) => {
      const [, data] = queryKey
      const uri = `${apiPrefix}/auth`
      return makePromise(httpPost(uri, data, false, false))
    },
  },
}
