import axiosInstance from '@/config';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IErrorResponse, ISIGNIN_FORM_DATA, ISIGNUP_FORM_DATA } from '@/interfaces';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useState } from 'react';


interface IAuthProviderProps {
    children: ReactNode;
}
interface IUser {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    authType: string;

}

interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    saveUser: (data: IUser) => void;
    signup: (data: ISIGNUP_FORM_DATA) => Promise<void>;
    signin: (data: ISIGNIN_FORM_DATA) => Promise<void>;
    logout: () => Promise<void>;

}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    signup: async () => { },
    signin: async () => { },
    logout: async () => { },
    saveUser: () => { },
    isLoading: false
})



export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    const { setOnLocalStorage, removeFromLocalStorage } = useLocalStorage();
    const [isLoading, setLoading] = useState<boolean>(false);


    const saveUser = (data: IUser) => {
        setOnLocalStorage("user", JSON.stringify(data))
        setUser(data);
    }
    const signup = async (formData: ISIGNUP_FORM_DATA) => {
        setLoading(true);
        try {
            const { data, status } = await axiosInstance.post("/users/signup", formData);
            if (status === 201) {
                saveUser(data.user);
                setOnLocalStorage("token", data.token)
                return Promise.resolve();
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "An error occurred during sign-up";
        } finally {
            setLoading(false);
        }
    }
    const signin = async (formData: ISIGNIN_FORM_DATA) => {
        setLoading(true);
        try {
            const { data, status } = await axiosInstance.post("/users/signin", formData);
            if (status === 200) {
                saveUser(data.user);
                setOnLocalStorage("token", data.token)
                return Promise.resolve();
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "An error occurred during sign-in";
        } finally {
            setLoading(false);
        }
    }
    const logout = async () => {
        removeFromLocalStorage("token");
        removeFromLocalStorage("user");
        setUser(null)
        setTimeout(() => {
            window.location.href = "/auth/signup";
        }, 500);
    }

    return (
        <AuthContext.Provider value={{ user, saveUser, signup, signin, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}