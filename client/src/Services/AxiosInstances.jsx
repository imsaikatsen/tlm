import axios from 'axios'
// const BASE_URL = process.env.REACT_APP_ENV === 'PRODUCTION' ? 'http://192.168.121.175:3000/api/v02/' : 'http://localhost:3000'
const BASE_URL = 'http://localhost:3000'

/** ========PUBLIC INSTANCE======*/
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    },
})

/** ========SECRET INSTANCE====== */
export const axiosSecretInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // For sending cookies
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    },
})


/** ========PRIVATE INSTANCE======
 * With access token.
 */
export const axiosPrivateInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
    }
})