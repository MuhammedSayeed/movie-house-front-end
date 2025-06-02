
import EditEmailModal from "@/components/EditEmailModal";
import EditNameModal from "@/components/EditNameModal";
import EditPasswordModal from "@/components/EditPasswordModal";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext"
import { Edit } from "lucide-react";
import { useContext, useState } from "react"

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isNameModalOpen, setNameModalOpen] = useState(false);
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    interface IUSER_INPUTS {
        label: string;
        value: string | undefined;
        disabled?: boolean;
        onClick: () => void;
    }

    const USER_INPUTS: IUSER_INPUTS[] = [
        {
            label: "Name",
            value: user?.name,
            onClick: () => setNameModalOpen(true)
        },
        {
            label: "Email",
            value: user?.email,
            disabled: user?.authType === "google",
            onClick: () => setEmailModalOpen(true)
        },
        {
            label: "Password",
            value: "**********",
            disabled: user?.authType === "google",
            onClick: () => setPasswordModalOpen(true)

        }
    ]

    const RENDER_INPUTS = USER_INPUTS.map(({ disabled, label, value, onClick }, idx) => {

        const isLastOne = USER_INPUTS.length - 1 === idx;

        return (
            <div key={idx} className={`flex justify-between items-center py-4 ${isLastOne ? "border-b-0" : "border-b border-white/15"}`}>
                <div>
                    <h4 className="font-semibold text-white text-[15px]">{label}</h4>
                    <h5 className="font-medium text-[14px] text-gray-500">{value}</h5>
                </div>
                <Button type="button" disabled={disabled} onClick={onClick} variant={"secondary"} className="bg-second-dark text-white hover:bg-second-extra-dark">
                    <span><Edit /></span> Edit
                </Button>
            </div>
        );

    });

    return (
        <div className='h-screen grid grid-rows-[64px_auto] px-6'>
            <div></div>
            <div>
                <div className="max-w-md mx-auto bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 shadow-md rounded-xl mt-20 py-9 px-6 md:px-10 space-y-5">
                    <div className="text-left space-y-1">
                        <h1 className="text-3xl text-second font-semibold">Profile</h1>
                        <p className="text-xs text-gray-400">Feel free to edit your information.</p>
                    </div>
                    <div className="w-full space-y-3">
                        {RENDER_INPUTS}
                    </div>
                </div>
            </div>
            <EditNameModal isOpen={isNameModalOpen} onClose={() => setNameModalOpen(false)} />
            <EditEmailModal isOpen={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} />
            <EditPasswordModal isOpen={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
        </div>
    )
}

export default Profile