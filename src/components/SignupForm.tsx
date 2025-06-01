import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/validation";
import { SIGNUP_INPUTS_FORM, toastStyle } from "@/constants/index"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { ISIGNUP_FORM_DATA } from "@/interfaces";
import { AuthContext } from "@/context/AuthContext";
import Spinner from "./Spinner";
import toast from "react-hot-toast";


const SignupForm = () => {
    const { signup, isLoading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm({ resolver: yupResolver(signupSchema) });

    const renderInputs = SIGNUP_INPUTS_FORM.map(({ name, placeholder, type }, idx) => (
        <div className="w-full space-y-2" key={idx}>
            <label className="block text-white text-sm font-medium text-left" htmlFor={name}>{placeholder}</label>
            <Input className="bg-transparent rounded-lg outline-none border-white/50 text-white font-medium py-5" {...register(name)} placeholder={placeholder} type={type} />
            {errors[name] && <p className="text-sm text-second">{errors[name].message}</p>}
        </div>
    ))
    const onSubmit = async (data: ISIGNUP_FORM_DATA) => {
        toast.promise(
            signup(data).then(() => {
                setTimeout(() => {
                    window.location.href = "/"
                }, 1000);
            }),
            {
                loading: "Loading...",
                success: () => {
                    return "Here we go!";
                },
                error: (errorMessage) => {
                    return errorMessage;
                }
            },
            {
                style: toastStyle
            }
        )
    }

    useEffect(() => {
        setFocus("email");
    }, [])

    return (
        <div className="max-w-sm space-y-6 py-9 mx-auto px-10 bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 shadow-md rounded-xl">
            <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold text-white">Create your account</h1>
                <p className="text-sm text-white/50">Welcome! Please fill in the details to get started.</p>
            </div>
            <div className="flex w-full gap-2">
                <AuthWithGoogle />
            </div>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full h-[1px] bg-white/50"></div>
                <span className="text-white/50 text-sm">Or</span>
                <div className="w-full h-[1px] bg-white/50"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 ">
                {renderInputs}
                <Button disabled={isLoading} variant={"secondary"} className="w-full text-primary ">
                    {isLoading ? <Spinner color="black" size={20} /> : "Signup"}
                </Button>
            </form>
            <div className="w-full text-white text-center">
                <p className="text-white/50">DAlready have an account? <Link className="hover:underline text-white" to={"/auth/signin"}>Sign in</Link></p>
            </div>
        </div>
    )
}

export default SignupForm