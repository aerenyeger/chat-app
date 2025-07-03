import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import{createBrowserRouter,RouterProvider} from "react-router-dom"
function App() {
  const router=createBrowserRouter([
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
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
