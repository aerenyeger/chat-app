import React from 'react'
import ChatHeader from '../components/ChatHeader'
import Sidebar  from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useChatstore } from '../store/useChatstore'
import MessageInput from '../components/MessageInput'
const Home = () => {
  const{userSelected}=useChatstore()
  return (
    <div className='flex flex-row '>
      <div>
        <Sidebar/>
      </div>
      {userSelected ? <>
      <div className='flex flex-col w-full bg-[url("/bgImg.png")] bg-cover h-screen'>
        <ChatContainer/>
      <MessageInput/>
      </div>
      </>:
      <div className='flex flex-col w-full bg-[url("/bgImg.png")] bg-cover h-screen text-white text-2xl items-center pt-80 font-bold pl-30'>
        <h1>No Chat Selected.</h1>
        <h1>Select a Use to continue Chatting</h1>
        </div >}
    </div>
  )
}

export default Home
