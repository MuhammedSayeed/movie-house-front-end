import SimpleNavbar from '@/components/SimpleNavbar'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div style={{backgroundImage: 'url("https://res.cloudinary.com/dndjbkrcv/image/upload/v1736884802/hero_zjpt3a.png")'}} className="w-full object-cover bg-cover bg-center bg-fixed min-h-screen" >
      <div className=" relative z-[5] w-full grid grid-rows-[auto_1fr] ">
        <SimpleNavbar />
        <div className="mx-6 my-8 md:mt-16 ">
          <Outlet />
        </div>
      </div>
      <div className="fade-bottom"></div>
    </div>
  )
}

export default AuthLayout