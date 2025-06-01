import CardSkeleton from "@/skeleton/Card";
import useCustomQuery from "../hooks/useCustomQuery";
import { IShow } from "../interfaces";
import Card from "./Card";


interface IRow {
    title: string;
    apiUrl: string;
}

const Row = ({ title, apiUrl }: IRow) => {
    const { data, isLoading } = useCustomQuery({
        queryKey: ["row-shows", apiUrl],
        url: apiUrl
    })

    const CARDS = data?.results.map((show: IShow, index: number) => {
        if (show.poster_path) {
            return <Card show={show} first={index == 0} key={show.id} />
        }
    })

    const RENDER_SKELETON = Array.from({ length: 20 }, (_, index) => (
        <CardSkeleton key={index} />
    ))




    return (
        <div className="w-full h-full grid grid-rows-[auto_1fr] gap-3">
            <div>
                <h2 className="text-white text-[20px] font-medium">{title}</h2>
            </div>
            <div className="w-full h-full flex items-center  py-2 overflow-hidden gap-4 overflow-x-scroll overflow-y-hidden no-scrollbar pr-2">
                {isLoading ? RENDER_SKELETON : CARDS}
            </div>
        </div>
    )
}

export default Row