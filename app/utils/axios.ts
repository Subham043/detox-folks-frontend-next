import axios, { AxiosInstance } from 'axios';


export const axiosPublic:AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
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