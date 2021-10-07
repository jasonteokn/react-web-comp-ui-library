import config from './config'

import { CONTENT_TYPE, RESPONSE_BODY } from './enum'

const serverUrl = (uri) => `${config.server.url}/${uri}`

const handleFetchError = async (response) => {
  if (!response.ok) {
    const contentType = response.headers.get('Content-Type').split(';')
    console.log('[RESPONSE ERROR]:', response, contentType)

    //errMsg to show msg from backend
    let errMsg = []

    switch (contentType[0]) {
      case CONTENT_TYPE.JSON:
        errMsg = await response.json()
        console.log('[RESPONSE ERROR]:', errMsg)
        break
      case CONTENT_TYPE.TEXT_PLAIN:
        errMsg = await response.text()
        console.log('[RESPONSE ERROR]:', errMsg)
        break
    }
    throw Error(`: ${response.status}-${response.statusText}`)
  }
  return response
}

const abortableFetch = function (url, opts, logoutIfError, isFile) {
  const controller = new AbortController()
  const signal = controller.signal

  let responseBody = ''
  if (isFile) {
    responseBody = RESPONSE_BODY.BLOB
  } else {
    responseBody = RESPONSE_BODY.JSON
  }
  return {
    abort: () => controller.abort(),
    action: (resBodyType = responseBody) => {
      console.log('FETCHING...', url, opts)
      //TODO: Add loader here

      return fetch(url, { ...opts, signal })
        .then(handleFetchError)
        .then((response) => {
          switch (resBodyType) {
            case RESPONSE_BODY.BLOB:
              return response.blob()
            case RESPONSE_BODY.TEXT:
              return response.text()
            case RESPONSE_BODY.JSON:
              return response.json()
            default:
              return response
          }
        })
        .then((result) => {
          //TODO: remove loader here
          return result
        })
        .catch((err) => {
          const errObj = {
            name: err.name,
            message: err.message,
            stack: err.stack,
          }

          if (err.name === 'AbortError') {
            console.log('Fetch aborted')
          } else {
            if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
              console.log('Possibliy invakud access token.', err)
            } else {
              console.log('[FETCH ERROR]:', err.stack)
            }

            if (logoutIfError) {
              console.log('Logging out...')
              //TODO: Add logout() here
            }
          }
          //TODO: remove loader here
          return { fetchError: errObj }
        })
    },
  }
}

export const httpGet = (
  uri,
  headers = {},
  withAuth = true,
  logoutIfError = false,
  isFile = false //Set to true if there are files uploaded
) => {
  const url = serverUrl(uri)

  const opts = {
    headers: withAuth ? addAuthorization(headers) : headers,
  }

  const fetchObj = abortableFetch(url, opts, logoutIfError, isFile)
  return fetchObj
}

export const httpPost = (
  uri,
  data,
  withAuth = true,
  logoutIfError = false,
  isFile = false
) => {
  const url = serverUrl(uri)
  const body = JSON.stringify(data)

  const headers = { 'Content-Type': CONTENT_TYPE.JSON }

  const opts = {
    method: 'POST',
    headers: withAuth ? addAuthorization(headers) : headers,
    body,
  }

  const fetchObj = abortableFetch(url, opts, logoutIfError, isFile)
  return fetchObj
}

export const httpPostFormData = (
  uri,
  data,
  withAuth = true,
  logoutIfError = false,
  isFile = false
) => {
  const url = serverUrl(uri)
  const formData = data

  const headers = {}

  const opts = {
    method: 'POST',
    headers: withAuth ? addAuthorization(headers) : headers,
    body: formData,
  }

  const fetchObj = abortableFetch(url, opts, logoutIfError, isFile)
  return fetchObj
}

function addAuthorization(headers) {
  return {
    ...headers,
    Authorization: `Bearer (TOKEN)`,
  }
}
