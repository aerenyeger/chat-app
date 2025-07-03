import React from 'react'
import ChatHeader from '../components/ChatHeader'
import Sidebar  from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useChatstore } from '../store/useChatstore'
import MessageInput from '../components/MessageInput'
const Home = () => {
  const{userSelected}=useChatstore()
  return (
    <div>
      <Sidebar/>
      {userSelected ? <><ChatContainer/><MessageInput/></>:("no chat selected")}
    </div>
  )
}

export default Home
