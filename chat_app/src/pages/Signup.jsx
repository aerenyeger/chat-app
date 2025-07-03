import React, { useEffect, useState } from 'react'
import{useAuthstore} from "../store/useAuthstore"
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [data, setdata] = useState({
    username: "",
    password: "",
    email: ""
  })
  const{signup}=useAuthstore()
  const navigate=useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    await signup(data)
  }

  return (
    <div>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <h5>enter username</h5>
        <input type="text" onChange={(e) => { setdata({ ...data, username: e.target.value }) }} />
        <h5>enter email</h5>
        <input type="text" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} />
        <h5>enter password</h5>
        <input type="password" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} />
        <button type='submit'>Signup</button>
      </form>
    </div>
  )
}

export default Signup;
