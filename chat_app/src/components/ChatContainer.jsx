import React from 'react'
import { useChatstore } from '../store/useChatstore'
import { useAuthstore } from '../store/useAuthstore';
import { useEffect,useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
const ChatContainer = () => {
  const{messages,users,userSelected,userLoading,messageLoading,getUsers,fetchMessages,subscribeToMessages,unsubscribeToMessages}=useChatstore();
  const{checkAuth}=useAuthstore();
  const messageEndRef=useRef(null)
  useEffect(()=>{
    fetchMessages(userSelected._id);
    subscribeToMessages();
    return()=>{unsubscribeToMessages()}
  },[userSelected._id,fetchMessages,subscribeToMessages,unsubscribeToMessages])

 

  if(messageLoading) return(<div>messageLoading</div>)
  return (
    <div>
      <ChatHeader/>
      <div>
        {messages.map((message)=>(
          <div key={message._id}  >
            <div>
              {message.text && <p>{message.text}</p>}
            </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default ChatContainer
