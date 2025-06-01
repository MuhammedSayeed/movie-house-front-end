import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validation";
import { LOGIN_INPUTS_FORM, toastStyle } from "@/constants/index"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link} from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { AuthContext } from "@/context/AuthContext";
import { ISIGNIN_FORM_DATA } from "@/interfaces";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
const LoginForm = () => {
    const { signin, isLoading } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm({ resolver: yupResolver(loginSchema) });

    const renderInputs = LOGIN_INPUTS_FORM.map(({ name, placeholder, type }, idx) => (
        <div className="w-full space-y-2" key={idx}>
            <label className="block text-white text-sm font-medium text-left" htmlFor={name}>{placeholder}</label>
            <Input className="bg-transparent rounded-lg outline-none border-white/50 text-white font-medium py-5" {...register(name)} placeholder={placeholder} type={type} />
            {errors[name] && <p className="text-sm text-second">{errors[name].message}</p>}
        </div>
    ))

    const onSubmit = async (data: ISIGNIN_FORM_DATA) => {
        toast.promise(
            signin(data).then(() => {
                setTimeout(() => {
                    window.location.href = "/"
                }, 1000);
            }),
            {
                loading: "Loading...",
                success: () => {
                    return "Welcome Back!";
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
                <h1 className="text-2xl font-bold text-white">Sign in to <span className="text-second">Movie House</span></h1>
                <p className="text-sm text-white/50">Welcome back! Please sign in to continue</p>
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
                    {isLoading ? <Spinner color="black" size={20} /> : "Login"}
                </Button>
            </form>
            <div className="w-full text-white text-center">
                <p className="text-white/50">Don’t have an account? <Link className="hover:underline text-white" to={"/auth/signup"}>Sign up</Link></p>
            </div>


        </div>
    )
}

export default LoginForm