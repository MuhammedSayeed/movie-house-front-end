import { toggleOpenDrawer } from "@/app/slices/dawerSlice";
import axiosInstance from "@/config";
import { AuthContext } from "@/context/AuthContext";
import { FavoriteContext } from "@/context/FavoriteContext";
import { IData_show } from "@/interfaces";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import useToken from "./useToken";



const useFavorite = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { updateTheList } = useContext(FavoriteContext);
    const { user } = useContext(AuthContext);
    const { token } = useToken();



    const handleAddtoFavList = async (dataShow: IData_show) => {

        if (!token) return dispatch(toggleOpenDrawer(true))
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.post("/favorites", dataShow, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (data) {
                updateTheList(data.results)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRemoveFromFavList = async (id: number) => {
        if (!token || !user) return;
        setIsLoading(true);
        try {
            const { data, status } = await axiosInstance.patch("/favorites", { id }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (status === 200) {
                updateTheList(data.results);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        handleAddtoFavList,
        handleRemoveFromFavList,
    }
}

export default useFavorite