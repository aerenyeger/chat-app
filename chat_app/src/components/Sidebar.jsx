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
    <div className='w-60 border bg-[url("/111.png")] flex flex-col pb-2 text-white h-screen rounded-md bg-cover '>
      <div className='inline-block border '>
        <p className='inline-block mt-2 ml-15 '>Show online </p>
        <input className="inline-block ml-4"type="checkbox" checked={showOnlineOnly} onChange={(e)=>{setshowOnlineOnly(e.target.checked)}} />
      </div>
        {filteredUsers.map((user)=>(
            <button className="hover:cursor-pointer hover:border hover:border-white hover:rounded-md"key={user._id} onClick={(e)=>{setSelectedUser(user)}}>
              <div className='p-2'>{user.username}

              </div>
            </button>
        ))}
    </div>
  )
}

export default Sidebar
