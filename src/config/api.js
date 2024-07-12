import axios from 'axios';

export const SELECTED_API = 'selected_api'
export const TEST_HOST = 'teststag.smrtstats.com'
const PORT = 8888
const isStaging = TEST_HOST === window.location.host

export const ENV = process.env.NODE_ENV || 'production'
export const isProduction = process.env.NODE_ENV === 'production' && !isStaging
const env = isProduction ? ENV : localStorage.getItem(SELECTED_API) ?? ENV

export const APIS = {
  demo_development: {
    apiURL: 'https://demo.smrtstats.com:8889',
    baseURL: 'https://demo.smrtstats.com:8889/api/v1',
    videoServiceURL: 'https://video.smrtstats.com:8111',
  },
  development: {
    apiURL: `https://teststag.smrtstats.com:${PORT}`,
    baseURL: `https://teststag.smrtstats.com:${PORT}/api/v1`,
    videoServiceURL: 'https://video.smrtstats.com:8111',
  },
  new_development: {
    apiURL: `https://vishchtem.smrtstats.com:${PORT}`,
    baseURL: `https://vishchtem.smrtstats.com:${PORT}/api/v1`,
    videoServiceURL: 'https://video.smrtstats.com:8111',
  },
  pos_development: {
    apiURL: `https://yurzymzyn.smrtstats.com:${PORT}`,
    baseURL: `https://yurzymzyn.smrtstats.com:${PORT}/api/v1`,
    videoServiceURL: 'https://video.smrtstats.com:8111',
  },
  production: {
    apiURL: isStaging ? `https://platform.smrtstats.com:${PORT}` : process.env.REACT_APP_API_MAIN_URL_TEST,
    baseURL: isStaging ? `https://platform.smrtstats.com:${PORT}/api/v1` : process.env.REACT_APP_BASE_URL_TEST,
    videoServiceURL: isStaging ? 'https://video.smrtstats.com:8111' : process.env.REACT_APP_VIDEO_SERVICE_API_URL,
  },
}
export const VIDEO_SERVICE_URL = APIS[env].videoServiceURL
export const BASE_URL = APIS[env].baseURL
export const API_URL = APIS[env].apiURL

export const $api = axios.create({
  baseURL: BASE_URL,
});

const langURL = 'https://lexicon.smrtstats.com/api'
export const $api_lang = axios.create({ baseURL: langURL });
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token ? `Token ${token}` : ''
  return config;
})
