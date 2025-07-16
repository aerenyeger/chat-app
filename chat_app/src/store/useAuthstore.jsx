import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import {io} from "socket.io-client"
import { useNavigate } from "react-router-dom"
const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:3000" : "/"
export const useAuthstore = create((set, get) => ({
    userdetails: null,
    loggedin: false,
    onlineUsers: [],
    socket: null,

    // checking whether the user has json web token 
    checkAuth: async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check`,{
                withCredentials:true
            })
            set({ userdetails: res.data })
            get().connectSocket()
        } catch (error) {
            console.log("error while checking authorization")
            set({ userdetails: null })
            console.log(error.message)
        }
    },

    signup: async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, 
                     data,
                {withCredentials:true}
            )
            if (res.status === 201) {
                set({ userdetails: res.data })
                toast.success("signup successfull")
                get().connectSocket()
                return true
            }
        } catch (error) {
            console.log("error while signingup")
            toast.error("error in signup")
            console.log(error.message)
            return false
        }
    },

    login: async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,data,{withCredentials:true})
            if (res.status === 200) {
                set({ userdetails: res.data })
                toast.success(
                    "Login successfull"
                )
                get().connectSocket()
                console.log("here")
                return true
            }
        } catch (error) {
            console.log("error while login")
            toast.error("login data not correct")
            console.log(error.message)
            return false
        }
    },

    //cookie remove
    logout: async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{},{withCredentials:true})
            if (res.status === 200) {
                console.log("logout successfull")
                get().disconnectSocket()
            }
            else {
                console.log("error while logout")
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    connectSocket:()=>{
        const {userdetails}=get();
        console.log(userdetails)
        if(!userdetails || get().socket?.connected){return}

        const socket=io(BASE_URL,{query:{
            userId:userdetails._id
        }})
        socket.connect();
        console.log("socket connected")
        set({socket:socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
}))