import {create} from "zustand"
import axios from "axios"
import { useAuthstore } from "./useAuthstore"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useChatstore=create((set,get)=>({
    messages:[],
    users:[],
    userSelected:null,
    userLoading:false,
    messageLoading:false,

    getUsers:async()=>{
        try {
            set({userLoading:true})
            const res=await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/users`,{withCredentials:true})//cedential
            set({users:res.data})
        } catch (error) {
            console.log("error while getUsers")
            console.log(error.message)
        }
        finally{
            set({userLoading:false})
        }
    },

    fetchMessages:async(userId)=>{
        set({messageLoading:true})
        try {
            const res=await axiosInstance.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/${userId}`,{withCredentials:true})  //pass the credentials also
            set({messages:res.data})
        } catch (error) {
            console.log("error while fetchMessages")
            toast.error(error.response.data.message)
            console.log(error.message)
        }
        finally{
            set({messageLoading:false})
        }
    },

    sendMessages:async(messageData)=>{
        try {
            const{userSelected,messages}=get();
            const res=await axiosInstance.post(`/messages/send/${userSelected._id}`,messageData)
            set({messages:[...messages,res.data]})
        } catch (error) {
             console.log("error while sendMesaages")
             toast.error(error.response.data.message)
            console.log(error.message)
        }
    },

    subscribeToMessages:()=>{
        const {userSelected}=get();
        if(!userSelected) return
        const socket=useAuthstore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser=newMessage.senderId===userSelected._id
            if(!isMessageSentFromSelectedUser){
                return
            }
            set({messages:[...get().messages,newMessage],
            })
        })
    },

    unsubscribeToMessages:()=>{
        const socket=useAuthstore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser:(userSelected)=>{set({userSelected})}
}))

