import Modal from "./Modal"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EDIT_NAME_INPUTS, toastStyle } from "@/constants";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editNameSchema } from "@/validation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { IEDIT_NAME_DATA, IErrorResponse } from "@/interfaces";
import axiosInstance from "@/config";
import Spinner from "./Spinner";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useToken from "@/hooks/useToken";
import useLocalStorage from "@/hooks/useLocalStorage";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditNameModal = ({ isOpen, onClose }: IProps) => {
  const {token} = useToken();
  const {setOnLocalStorage} = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const { user, saveUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(editNameSchema),
    defaultValues: {
      name: user?.name
    },
    context: {
      authType: user?.authType
    }
  })

  const nameValue = useWatch({
    control,
    name: "name",
    defaultValue: user?.name
  })

  const isNameUnchanged = nameValue === user?.name;

  const RENDER_INPUTS = EDIT_NAME_INPUTS.map(({ id, label, name, type }) => {
    if (name === "password" && user?.authType === "google") {
      return null;
    }
    return (
      <div key={name} className="flex flex-col space-y-1">
        <label className="font-medium text-sm text-gray-400" htmlFor={id}>{label}</label>
        <Input {...register(name)} className="font-medium bg-transparent border border-white/15 p-[10px] outline-none text-white" name={name} id={id} type={type} />
        {errors[name] && <p className="text-sm text-second">{errors[name]?.message}</p>}
      </div>
    )
  })

  const onSubmit = async (newData: IEDIT_NAME_DATA) => {
    if (!token) return;
    setLoading(true);
    try {
      if (user?.authType === "google") {
        delete newData.password;
      }
      const { data, status } = await axiosInstance.patch("/users/name", { ...newData, authType: user?.authType } , {
        headers : {
          "Authorization": `Bearer ${token}`
        }
      });
      if (status === 200) {
        saveUser(data?.user)
        setOnLocalStorage("token" , data.token)
        toast.success("Name updated successfully", {
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
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    reset({
      name: user?.name,
      password: ""
    });
  }, [isOpen, reset, user?.name])

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div onClick={(e) => e.stopPropagation()} className="container sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-6 bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 shadow-md rounded-xl py-9 px-6 md:px-10 space-y-5">
        <div className="text-left space-y-1">
          <h1 className="text-3xl text-second font-semibold">Edit Name</h1>
          <p className="text-xs text-gray-400">Make changes and click Save</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {RENDER_INPUTS}
          <div className="flex items-center justify-between gap-2">
            <Button onClick={onClose} type="button" variant={"outline"} size={"lg"} className="w-full bg-[#121c3c]/5 backdrop-blur-sm border border-white/15 text-white">
              Cancel
            </Button>
            <Button disabled={isNameUnchanged} type="submit" size={"lg"} className="w-full bg-second-dark hover:bg-second-extra-dark">
              {loading ? <Spinner color="white" size={22} /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EditNameModal