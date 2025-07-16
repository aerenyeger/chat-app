import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import{createBrowserRouter,RouterProvider, useNavigate} from "react-router-dom"
import { Navigate } from 'react-router-dom'
import{Toaster} from"react-hot-toast"
function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Navigate to="/login" replace/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/home",
      element:<Home/>
    }
  ]);

  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   <Toaster position='top-center' reverseOrder={false}/>
   </>
  )
}

export default App
