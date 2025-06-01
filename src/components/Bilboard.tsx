import { FavoriteContext } from "@/context/FavoriteContext";
import useFavorite from "@/hooks/useFavorite";
import { IBilboard, IData_show } from "@/interfaces";
import { getTheYear, truncateText } from "@/lib/utils"
import { Info, Minus, Plus } from "lucide-react";
import { useContext } from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";


interface IProps {
    bilboard: IBilboard
}
const Bilboard = ({ bilboard }: IProps) => {
    const { handleAddtoFavList, handleRemoveFromFavList, isLoading } = useFavorite();
    const { list } = useContext(FavoriteContext);
    const isFavorite = Array.isArray(list) && list.find((item) => item.id === bilboard.id);

    const dataShow: IData_show = {
        id: bilboard.id,
        title: bilboard.title || bilboard.name,
        media_type: bilboard.media_type,
        overview: bilboard.overview,
        poster_path: bilboard.poster_path,
        release_date: bilboard.release_date || bilboard.first_air_date,
        vote_average: bilboard.vote_average.toFixed(1),
    }
    const handleClick = () => {
        if (isFavorite) {
            handleRemoveFromFavList(bilboard.id);
        } else {
            handleAddtoFavList(dataShow);
        }
    };
    const getButtonContent = () => {
        if (isLoading) {
            return <div className="animate-pulse">Loading...</div>;
        }
        const text = isFavorite ? "Remove" : "Add";
        const Icon = isFavorite ? Minus : Plus;

        return (
            <div className="flex items-center gap-1">
                {text} <Icon size={15} />
            </div>
        );
    }

    const buttonText = getButtonContent();
    return (
        <div className="space-y-7">
            <h1 className="text-6xl font-medium ">{truncateText((bilboard.title || bilboard.name) as string, 11)}</h1>
            <p className="opacity-70">{truncateText(bilboard.overview, 140)}</p>
            <div className="flex items-center gap-4 ">
                <span className="text-xl">{getTheYear(bilboard.first_air_date || bilboard.release_date)}</span>
                <div className="px-4 py-1 font-bold text-[14px] bg-yellow-300 rounded-md text-black">
                    4K
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={handleClick} className="bg-white hover:bg-gray-300 text-black px-5 font-bold text-[18px] rounded-full flex items-center gap-2">
                    {buttonText}
                </Button>
                <Button variant={"outline"} className="bg-transparent px-7 py-3 font-bold text-[18px] rounded-full">
                    <NavLink className="flex items-center gap-2" to={`/show-details/${bilboard?.media_type}/${bilboard.id}`}>
                        More <Info size={16} />
                    </NavLink>
                </Button>
            </div>
        </div>
    )
}

export default Bilboard