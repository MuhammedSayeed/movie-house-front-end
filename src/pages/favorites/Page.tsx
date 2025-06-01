import CardList from "@/components/CardList";
import TypesFilter from "@/components/TypesFilter"
import { FavoriteContext } from "@/context/FavoriteContext"
import { useContext, useState } from "react"
import Lottie from "lottie-react"
import Emptylist from "../../animations/Emptylist.json"
import CardListSkeleton from "@/skeleton/CardList";
const Favorites = () => {

    const { list, isLoading } = useContext(FavoriteContext);

    const [activeType, setActiveType] = useState<"all" | "movie" | "tv">("all");
    const filteredList = activeType === "all" ? list : list.filter((show) => show.media_type === activeType);

    const EmptyListMessage = () => {
        const message =
            activeType === "all"
                ? "Your Favorite List is Empty"
                : activeType === "movie"
                    ? "Your Favorite Movie List is Empty"
                    : "Your Favorite TV List is Empty";

        return (
            <div className="space-y-3 mt-10">
                <Lottie className="w-80 h-80" animationData={Emptylist} />
                <p className="text-center text-gray-400">{message}</p>
            </div>
        );
    };

    const RenderFilteredList = () => {
        return filteredList.map((show) =>
            show.poster_path ? <CardList show={show} key={show.id} /> : null
        );
    };

    const RENDER_SKELETON = Array.from({ length: 5 }, (_, index) => (
        <CardListSkeleton key={index} />
    ))

    const RENDER_LIST = () => {
        return filteredList.length === 0 ? <EmptyListMessage /> : <RenderFilteredList />;
    };


    return (
        <div className="w-full min-h-screen px-6 grid grid-rows-[64px_auto_1fr] gap-y-10 ">
            <div></div>
            <TypesFilter activeType={activeType} setActiveType={setActiveType} />
            <div className="h-fit mx-auto flex flex-wrap justify-center gap-5 pb-7">
                {isLoading ? RENDER_SKELETON : RENDER_LIST()}
            </div>
        </div>
    )
}

export default Favorites