import React, { useEffect, useState } from 'react'
import { useAuthstore } from "../store/useAuthstore"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {
  const [data, setdata] = useState({
    username: "",
    password: "",
    email: ""
  })
  const { login, userdetails } = useAuthstore()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const resp=await login(data)
      if(resp) navigate("/home")
  }
  
  function navigateToSignup() {
    navigate("/signup")
  }
  return (
    <div className='bg-[url("/bgImg.png")] h-screen w-full bg-cover'>
        <div className='bg-blue-300 absolute top-60 left-124 p-2 rounded-md opacity-80'>
          <h1 className='text-5xl font-bold mb-4'>Welcome To Chat App...</h1>
          <form onSubmit={(e) => { handleSubmit(e) }}>
          <h2 className='text-2xl'>Enter Username</h2>
          <input className="border border-black rounded-md w-50 mb-5" type="text" onChange={(e) => { setdata({ ...data, username: e.target.value }) }} />
          <h2 className='text-2xl'>Enter Email</h2>
          <input className="border border-black rounded-md w-50 mb-5"type="text" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} />
          <h2 className='text-2xl'>Enter Password</h2>
          <input className="border border-black rounded-md w-50 mb-5" type="password" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} />
          <button className="ml-6 mb-4 px-3 py-1.5 bg-blue-400 rounded-md" type='submit'>Login</button>
        </form>
        <p className=' inline-block'>New User?</p>
          <button className="ml-6 px-3 py-1.5 bg-blue-400 rounded-md" onClick={() => { navigateToSignup() }}>Signup</button>
        </div>
        <div>
      </div>
    </div>
  )
}

export default Login;
