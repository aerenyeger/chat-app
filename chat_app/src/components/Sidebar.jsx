import React from 'react'
import { useEffect,useState } from 'react'
import { useChatstore } from '../store/useChatstore'
import { useAuthstore } from '../store/useAuthstore'
import{Users} from "lucide-react"
const Sidebar = () => {
    const{getUsers,setSelectedUser,users,userLoading}=useChatstore()
    const {onlineUsers}=useAuthstore();
    const[showOnlineOnly,setshowOnlineOnly]=useState(false)
    useEffect(()=>{
        getUsers()
        console.log(onlineUsers);
        console.log(users);
    },[])

    const filteredUsers=showOnlineOnly
    ?users.filter((user)=>onlineUsers.includes(user._id)):users;

    if(userLoading) return(<div>userLoading</div>)
  return (
    <div>
        <input type="checkbox" checked={showOnlineOnly} onChange={(e)=>{setshowOnlineOnly(e.target.checked)}} />
        {filteredUsers.map((user)=>(
            <button key={user._id} onClick={(e)=>{setSelectedUser(user)}}>{user.username}</button>
        ))}
    </div>
  )
}

export default Sidebar
