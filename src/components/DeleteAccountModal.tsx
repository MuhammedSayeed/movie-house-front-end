import { useState } from 'react';
import Modal from './Modal';
import { Button } from './ui/button';
import axiosInstance from '@/config';
import { AxiosError } from 'axios';
import { IErrorResponse } from '@/interfaces';
import toast from 'react-hot-toast';
import { toastStyle } from '@/constants';
import Spinner from './Spinner';


interface IProps {
    isOpen: boolean;
    onClose: () => void;
}
const DeleteAccountModal = ({ isOpen, onClose }: IProps) => {
    const [loading, setLoading] = useState(false);


    const onSubmit = async () => {
        setLoading(true);

        try {
            const { status } = await axiosInstance.delete("/users");
            if (status === 204) {
                onClose();
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            const message = errorObj.response?.data.message || "An expected error occurred";
            toast.error(message, {
                style: toastStyle
            });
        } finally {
            setLoading(false);
            localStorage.removeItem("movie-house-user");
            localStorage.removeItem("movie-house-fav-list");
            window.location.href = "/auth/signin";
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <div onClick={(e) => e.stopPropagation()} className="container sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-6 bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 shadow-md rounded-xl py-9 px-6 md:px-10 space-y-5">
                <div className="text-left space-y-1">
                    <h1 className="text-2xl text-white font-semibold">Are you sure you want to delete your account?</h1>
                </div>
                <div className="w-full space-y-4">
                    <div className="flex items-center justify-between gap-2">
                        <Button onClick={onClose} type="button" variant={"outline"} size={"lg"} className="w-full bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 text-white">
                            Cancel
                        </Button>
                        <Button type="button" onClick={onSubmit} size={"lg"} variant={"destructive"} className="w-full">
                            {loading ? <Spinner color="white" size={22} /> : "Confirm"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAccountModal