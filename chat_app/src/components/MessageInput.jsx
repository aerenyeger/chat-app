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
        <input type="text" value={text} onChange={(e)=>{settext(e.target.value)}}/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default MessageInput
