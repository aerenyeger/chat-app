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
  
  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({behaviour:'smooth'})
  },[messages])


  if(messageLoading) return(<div>messageLoading</div>)
  return (
    <div className='flex flex-col h-screen'>
      <ChatHeader/>
      <div className='flex-1 overflow-y-auto px-4 py-2'>
        {messages.map((message)=>(
          <div key={message._id}  style={{display:"flex" ,justifyContent: message.senderId===userSelected._id ? 'flex-start' : 'flex-end',}}>
            <div>
              {message.text && <p className={`${message.senderId===userSelected._id?"bg-green-400":"bg-green-500"} p-1 mb-3 rounded-md mr-2`}
              
              >{message.text}</p>}
            </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default ChatContainer
