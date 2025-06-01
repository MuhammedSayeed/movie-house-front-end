import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLinks } from "../constants";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { toggleOpenSearch } from "@/app/slices/searchSlice";
import { Menu, Search } from "lucide-react"
import DropdownMenuUser from "./DropdownMenu";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { toggleOpenDrawer } from "@/app/slices/dawerSlice";


const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();




    const handleNavigate = ({ path, privateRoute }: { path: string, privateRoute: boolean }) => {
        if (privateRoute && !user) {
            dispatch(toggleOpenDrawer(true))
        } else {
            navigate(path);
        }
        if (isOpen) {
            setIsOpen(false);
        }
    }

    const LINKS = NavLinks.map(({ label, path, privateRoute }) => {
        // const isActive = location.pathname === path;
        return <div onClick={() => handleNavigate({ path, privateRoute })} className={`text-white cursor-pointer`} key={label}>{label}</div>;
    });

    const SMALL_SCREEN_LINKS = NavLinks.map(({ label, path, privateRoute }) => {
        const isActive = location.pathname === path;
        return <div onClick={() => handleNavigate({ path, privateRoute })} className={`${isActive ? "text-white bg-black/20 backdrop-blur-md" : "text-gray-400"} cursor-pointer py-2 px-4 hover:bg-black/20 hover:backdrop-blur-md rounded-full transition-all duration-200`} key={label}>
            {label}
        </div>;
    });

    const handleClose = () => setIsOpen(false);
    const handleOpenSearch = () => {
        dispatch(toggleOpenSearch(true));
    }


    return <>
        <div className="w-full fixed top-0 left-0 right-0 z-[30]  text-white py-3 px-6 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center justify-between">
            <Link to={"/"}>
                <img className="w-[57px] min-w-[57px]" src="https://res.cloudinary.com/dndjbkrcv/image/upload/v1736884794/logo_vyce5m.png" />
            </Link>
            <div className="hidden md:flex justify-center w-full items-center">
                <div className="relative flex space-x-6 px-6 py-2 rounded-full bg-gray-200/10 backdrop-blur-md ">
                    {LINKS}
                </div>
            </div>
            <Modal className="md:invisible" onClose={handleClose} isOpen={isOpen} >
                <div onClick={(e) => e.stopPropagation()} className={`flex flex-col text-center space-y-4 text-xl px-4 transition-all duration-300 ease-in-out ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                    {SMALL_SCREEN_LINKS}
                </div>
            </Modal>
            <div className="flex justify-end items-center space-x-4">
                <button onClick={handleOpenSearch}><Search /></button>
                {
                    user ? <DropdownMenuUser /> : <Button onClick={() => navigate("/auth/signin")} variant={"outline"} className="w-full bg-transparent text-white">
                        Login
                    </Button>
                }
                <button className="md:hidden" onClick={() => setIsOpen((prev) => !prev)}><Menu /></button>
            </div>
        </div>
    </>
};
export default Navbar