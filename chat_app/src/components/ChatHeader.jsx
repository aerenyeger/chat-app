import React from 'react';
import{X} from "lucide-react"
import { useAuthstore } from '../store/useAuthstore';
import { useChatstore } from '../store/useChatstore';
const ChatHeader = () => {
  const { onlineUsers } = useAuthstore();
  const{userSelected,setSelectedUser}=useChatstore()
  return (
    <div>
        {userSelected.username}
        <button onClick={()=>{setSelectedUser(null)}}><X/>
        </button>
    </div>
  );
};

export default ChatHeader;