import React from 'react'

const ChatArea = () => {
  // fetch all the previous messages map them
  //a text area and a ssend button
  function handleSubmit(e){
    e.preventDefault;
    //send message 
  }
  return (
    <div>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <input type="text" />
        <button type="submit"></button>
      </form>
    </div>
  )
}

export default ChatArea
