import axios from "axios"

export const axiosInstance=axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`,
    withCredentials:true
})

// check whether it is in development or production phase