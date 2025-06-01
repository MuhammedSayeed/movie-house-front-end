import { toggleOpenDrawer } from "@/app/slices/dawerSlice";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button"
import {Drawer,DrawerContent,DrawerDescription,DrawerHeader,DrawerTitle} from "@/components/ui/drawer"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"



export function DrawerDemo() {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.drawer);
    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(toggleOpenDrawer(false));
    };

    const handleNavigate = (path : string) => {
        dispatch(toggleOpenDrawer(false))
        navigate(path)
    }

    return (
        <Drawer open={isOpen} onOpenChange={(open)=> !open && handleClose()} >
            <DrawerContent className="bg-primary border-none">
                <div className="mx-auto w-full max-w-sm p-4 my-3">
                    <DrawerHeader >
                        <DrawerTitle className="text-second text-center text-3xl ">Sorry!</DrawerTitle>
                        <DrawerDescription className="text-white text-center">
                            You need to be a member to use this feature
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex gap-2 ">
                        <Button onClick={() => handleNavigate("/auth/signin")} variant={"secondary"} className="w-full text-primary ">Login</Button>
                        <Button onClick={() => handleNavigate("/auth/signup")} variant={"secondary"} className="w-full text-primary ">Signup</Button>
                    </div>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
