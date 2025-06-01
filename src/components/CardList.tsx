import { IData_show } from "../interfaces"
import { baseUrl_posterMid } from "../services/api"
import { getTheYear, truncateText } from "@/lib/utils"
import AddToFavorite from "./AddToFavorite"
import RemoveFromFavorite from "./RemoveFromFavorite"
import { useContext } from "react"
import { FavoriteContext } from "@/context/FavoriteContext"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { toggleOpenSearch } from "@/app/slices/searchSlice"


interface ICardList {
    show: IData_show
}

const CardList = ({ show }: ICardList) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.search);

    const { list } = useContext(FavoriteContext);
    const isFavorite = Array.isArray(list) && list.find((item) => item.id === show.id);

    const handleNavigate = ()=>{
        if (isOpen){
            dispatch(toggleOpenSearch(false))
        }
        navigate(`/show-details/${show.media_type}/${show.id}`)
    }
    return (
        <div  className="w-fit space-y-2 animate-fadeIn bg">
            <div className="cursor-pointer w-[185px] h-[278px]" onClick={()=> handleNavigate()}>
                <img className="rounded-md object-cover h-full w-full" src={`${baseUrl_posterMid}${show.poster_path}`} />
            </div>
            <div className="w-full flex justify-between text-white">
                <h2 className="text-[15px] font-medium">{truncateText((show.title) as string, 10)}</h2>
                <h2 className="font-medium ">{getTheYear(show.release_date)}</h2>
            </div>
            <div className="w-full flex justify-between">
                {
                    isFavorite ? <RemoveFromFavorite id={show.id} /> : <AddToFavorite show={show} />
                }
                <div className="text-second">
                    <span className="flex items-center gap-1"> ★ {show.vote_average} </span>
                </div>
            </div>
        </div>
    )
}

export default CardList