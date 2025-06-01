import { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLDivElement>{
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({isOpen , onClose , children} : IProps) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 z-40 w-full h-screen bg-black/50 backdrop-blur-xl flex justify-center items-center transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} `}>
                {children}
        </div>
    )
}

export default Modal