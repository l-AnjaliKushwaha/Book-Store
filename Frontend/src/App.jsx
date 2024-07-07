import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
     <Navbar></Navbar>
     <Outlet/>
    </>
  )
}

export default App
