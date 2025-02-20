import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
      <div className='w-full'>
      <Navbar/>  
      <Outlet/>
      </div>
    )
}

export default MainLayout 