import axios from "axios"

export const axiosInstance=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

// check whether it is in development or production phase