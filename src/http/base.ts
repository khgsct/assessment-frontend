import axios from "axios";
import { user } from "@/auth";

export const http = (withJwt: boolean = true) => {
    const token = withJwt ? user.getToken() : null
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
    error => {
        return Promise.reject(error)
    })

    http.interceptors.response.use(response => {
        return response
    },
    error => {
        return Promise.reject(error.response.data)
    })

    return http
}
