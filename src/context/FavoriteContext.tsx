import axiosInstance from '@/config';
import { IData_show, IErrorResponse } from '@/interfaces';
import { AxiosError } from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';


interface IFavoriteProviderProps {
    children: ReactNode;
}


interface IFavoriteContext {
    isLoading: boolean;
    list: IData_show[]
    updateTheList: (newList: IData_show[]) => void;
}

export const FavoriteContext = createContext<IFavoriteContext>({
    isLoading: false,
    list: [],
    updateTheList: () => { }
})



export const FavoriteProvider = ({ children }: IFavoriteProviderProps) => {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState<IData_show[] | []>(() => {
        const StoredList = localStorage.getItem('movie-house-fav-list');
        return StoredList ? JSON.parse(StoredList) : [];
    })
    const [isLoading, setLoading] = useState<boolean>(false);


    const getList = async () => {
        setLoading(true);
        try {
            const { data, status } = await axiosInstance.get("/favorites");

            if (status === 200) {
                localStorage.setItem('movie-house-fav-list', JSON.stringify(data.results));
                setList(data.results);
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            console.log(errorObj);
        } finally {
            setLoading(false);
        }
    }

    const updateTheList = (newList: IData_show[]) => {
        localStorage.setItem('movie-house-fav-list', JSON.stringify(newList));
        setList(newList);
    }

    useEffect(() => {
        if (user !== null) {
            getList();
        }
    }, [user])

    return (
        <FavoriteContext.Provider value={{ isLoading, list , updateTheList }}>
            {children}
        </FavoriteContext.Provider>
    )

}