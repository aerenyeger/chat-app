import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import {io} from "socket.io-client"

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:3000" : "/"

export const useAuthstore = create((set, get) => ({
    userdetails: null,
    loggedin: false,
    onlineusers: [],
    socket: null,

    // checking whether the user has json web token 
    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/auth/check",{
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
            const res = await axios.post("http://localhost:3000/api/auth/signup", 
                     data,
                {withCredentials:true}
            )
            if (res.status === 201) {
                set({ userdetails: res.data })
                toast.success("signup successfull")
                get().connectSocket()
            }
        } catch (error) {
            console.log("error while signingup")
            toast.error("error in signup")
            console.log(error.message)
        }
    },

    login: async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login",data,{withCredentials:true})
            if (res.status === 200) {
                set({ userdetails: res.data })
                toast.success(
                    "entry created successfully"
                )
                get().connectSocket()
                console.log("here")
            }
        } catch (error) {
            console.log("error while login")
            console.log(error.message)
        }
    },

    //cookie remove
    logout: async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/logout",{},{withCredentials:true})
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