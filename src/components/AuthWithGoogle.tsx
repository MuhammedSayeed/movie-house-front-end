import GoogleIcon from "@/assets/icons/GoogleIcon"
import { Button } from "./ui/button"
import { useContext } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import axiosInstance from "@/config"
import { AuthContext } from "@/context/AuthContext"
import { AxiosError } from "axios"
import { IErrorResponse } from "@/interfaces"
import toast from "react-hot-toast"
import { toastStyle } from "@/constants"
import useLocalStorage from "@/hooks/useLocalStorage"

const AuthWithGoogle = () => {
    const { saveUser } = useContext(AuthContext);
    const {setOnLocalStorage} = useLocalStorage();

    const authWithGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            try {
                const { data } = await axiosInstance.post("/users/google", {
                    googleToken: res.access_token
                });

                // Save user data before redirecting
                saveUser(data.user);
                setOnLocalStorage("token", data.token);
                // Redirect the user after saving the data

                toast.success("Here we go!", {
                    style: toastStyle
                })
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);

            } catch (error) {
                const errorObj = error as AxiosError<IErrorResponse>;
                const errorMessage = errorObj.response?.data.message || "An error occurred during sign-in";
                toast.error(errorMessage, {
                    style: toastStyle
                });
            }
        }
    });

    return (
        <Button onClick={() => authWithGoogle()} variant={"outline"} className="flex-1 bg-transparent border-white/50 hover:bg-white/10"><GoogleIcon size={"30"} /></Button>
    )
}

export default AuthWithGoogle