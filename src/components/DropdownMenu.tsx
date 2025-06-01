import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { DEFAULT_PROFILE_IMG } from "@/constants";
import { truncateText } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const DropdownMenuUser = () => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" >
                    <img className="w-full h-full object-cover rounded-md border-2" src={user?.profileImage || DEFAULT_PROFILE_IMG} alt={user?.name} referrerPolicy="no-referrer"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-16 md:mr-6 mt-1 bg-primary text-white">
                <DropdownMenuLabel>
                    <span className="text-base">{truncateText((user?.name) as string, 20)}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup >
                    <DropdownMenuItem onClick={()=> navigate("/profile")} className="hover:bg-black/20 cursor-pointer ">
                        <User />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="hover:bg-black/20 cursor-pointer">
                        <LogOut />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default DropdownMenuUser