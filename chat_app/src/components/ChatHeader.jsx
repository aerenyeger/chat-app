import React from 'react';
import{X} from "lucide-react"
import { useAuthstore } from '../store/useAuthstore';
import { useChatstore } from '../store/useChatstore';
const ChatHeader = () => {
  const { onlineUsers } = useAuthstore();
  const{userSelected,setSelectedUser}=useChatstore()
  return (
    <div className='text-white ml-140 text-2xl'>
        {userSelected.username}
        <button className="mt-5 border border-white ml-2"onClick={()=>{setSelectedUser(null)}}><X/>
        </button>
    </div>
  );
};

export default ChatHeader;