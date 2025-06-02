import { useContext, useEffect, useState } from "react";
import Modal from "./Modal"
import { Button } from "./ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPasswordSchema } from "@/validation";
import { IEDIT_PASSWORD_DATA, IErrorResponse } from "@/interfaces";
import { EDIT_PASSWORD_INPUTS, toastStyle } from "@/constants";
import { Input } from "./ui/input";
import axiosInstance from "@/config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Spinner from "./Spinner";
import useToken from "@/hooks/useToken";
import useLocalStorage from "@/hooks/useLocalStorage";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditPasswordModal = ({ isOpen, onClose }: IProps) => {
  const {token} = useToken();
  const {setOnLocalStorage} = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const { saveUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(editPasswordSchema),
  })

  const RENDER_INPUTS = EDIT_PASSWORD_INPUTS.map(({ id, label, name, type }) => (
    <div key={name} className="flex flex-col space-y-1">
      <label className="font-medium text-sm text-gray-400" htmlFor={id}>{label}</label>
      <Input {...register(name)} className="font-medium bg-transparent border border-white/15 p-[10px] outline-none text-white" name={name} id={id} type={type} />
      {errors[name] && <p className="text-sm text-second">{errors[name]?.message}</p>}
    </div>
  ))


  const onSubmit = async (newData: IEDIT_PASSWORD_DATA) => {
    if (!token) return;
    setLoading(true);
    try {
      const {data , status} = await axiosInstance.patch("/users/password" , newData , {
        headers : {
          "Authorization": `Bearer ${token}`
        }
      });
      if (status === 200){
        saveUser(data.user);
        setOnLocalStorage("token" , data.token);
        toast.success("Password updated successfully", {
          style: toastStyle
        });
        onClose();
      }
    } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            const message = errorObj.response?.data.message || "An expected error occurred";
            toast.error(message, {
              style: toastStyle
            });
    } finally{
      setLoading(false);
    }
    
  }
  
  useEffect(() => {
    reset()
  }, [isOpen, reset])

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div onClick={(e) => e.stopPropagation()} className="container sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-6 bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 shadow-md rounded-xl py-9 px-6 md:px-10 space-y-5">
        <div className="text-left space-y-1">
          <h1 className="text-3xl text-second font-semibold">Edit Password</h1>
          <p className="text-xs text-gray-400">Make changes and click Save</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {RENDER_INPUTS}
          <div className="flex items-center justify-between gap-2">
            <Button onClick={onClose} type="button" variant={"outline"} size={"lg"} className="w-full bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 text-white">
              Cancel
            </Button>
            <Button type="submit" size={"lg"} className="w-full bg-second-dark hover:bg-second-extra-dark">
              {loading ? <Spinner color="white" size={22} /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditPasswordModal