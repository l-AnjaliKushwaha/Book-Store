import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
     <Navbar></Navbar>
     <Outlet/>
    </>
  )
}

export default App
