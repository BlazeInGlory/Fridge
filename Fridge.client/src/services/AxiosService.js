import Axios from 'axios'
import { baseURL } from '../env'
import { logger } from '../utils/Logger'

export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const nutritionix = Axios.create({
  baseURL:'https://trackapi.nutritionix.com/v2/search',
  timeout: 8000,
  headers: {
    'x-app-id': '0fdaded3',
    'x-app-key': '3659604fb2ab70e38599cc0129cda088',
  },
})

// NOTE this is the default key, the rest are for testing purposes
export const spoonacular = Axios.create({
  baseURL:'https://api.spoonacular.com/recipes',
  timeout: 8000,
  params: {
    'apiKey': '3b7a825bae534b73a459756e4f72b0ab',
  },
})

// export const spoonacular = Axios.create({
//   baseURL:'https://api.spoonacular.com/recipes',
//   timeout: 8000,
//   params: {
//     'apiKey': '06510b849aa24f93be162ea3d384db01',
//   },
// })

api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  }else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]',error.message)
  }
  return Promise.reject(error)
}
