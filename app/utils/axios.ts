import axios, { AxiosInstance } from 'axios';


export const axiosPublic:AxiosInstance = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    headers: {
        post: {
            Accept: 'application/json'
        },
        get: {
            Accept: 'application/json'
        }
    },
    withCredentials: false,
})

export const axiosPrivate:AxiosInstance = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
        post: {
            Accept: 'application/json'
        },
        get: {
            Accept: 'application/json'
        }
    },
    withCredentials: false,
})