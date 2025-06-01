import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Search from "../components/Search"
import { DrawerDemo } from "@/components/DrawerDemo"
const RootLayout = () => {
    return <>
        <DrawerDemo />
        <Search />
        <Navbar />
        <Outlet />
    </>
}

export default RootLayout