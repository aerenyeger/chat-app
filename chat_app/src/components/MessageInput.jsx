import React from 'react'
import { useEffect,useState } from 'react'
import { useChatstore } from '../store/useChatstore'

const MessageInput = () => {
    const [text,settext]=useState("")
    const {sendMessages}=useChatstore();
    async function handleSubmit(e){
      e.preventDefault();
      try {
        await sendMessages({text:text.trim()})
        settext("")
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <div>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <input className="bg-blue-400 w-120 border border-white text-white p-0.5 absolute bottom-3.5 right-140" type="text" value={text} onChange={(e)=>{settext(e.target.value)}}/>
        <button className="ml-6 px-3 py-1.5 bg-blue-400 rounded-md absolute bottom-2.5 right-120" type='submit'>Send</button>
      </form>
    </div>
  )
}

export default MessageInput
