import axios, { AxiosError } from "axios";
import { user } from "@/auth";

/** 
 * @param {boolean} withJwt - An optional param with a default value (true)
 * @returns {import('axios').AxiosInstance} http - AxiosInstance with the default configuration
*/
export const http = (withJwt: boolean = true) => {
    const token = withJwt ? `Bearer ${user.getToken()}` : null
    const http = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        timeout: 10_000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    http.interceptors.request.use(request => {
        return request
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    })

    http.interceptors.response.use(response => {
        return response
    },
    (error: AxiosError) => {
        const httpStatusCode = error.response?.status
        handleErrorHttpStatusCode(httpStatusCode)
        return Promise.reject(error.response?.data)
    })

    return http
}

const handleErrorHttpStatusCode = (httpStatusCode: number | undefined) => {
    switch (httpStatusCode) {
        case 401:
            user.logout()
            break;
        case 500:
            alert('something went wrong with server')
            break;
        default:
            break;
    }
}
