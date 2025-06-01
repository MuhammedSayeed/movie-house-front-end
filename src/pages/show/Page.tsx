import CustomTooltip from "@/components/CustomTooltip";
import Gradiant from "@/components/Gradiant";
import Row from "@/components/Row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteContext } from "@/context/FavoriteContext";
import useCustomQuery from "@/hooks/useCustomQuery";
import useFavorite from "@/hooks/useFavorite";
import { ICast, IData_show, IGenre } from "@/interfaces";
import { getTheYear } from "@/lib/utils";
import { baserUrl_IMG_EXTRA_SMALL, baseUrl_IMG_BIG, discover, getDetails } from "@/services/api";
import CastSkeleton from "@/skeleton/Cast";
import DetailsSkeleton from "@/skeleton/Details";
import GenresSkeleton from "@/skeleton/Genres";
import { Minus, Play, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const ShowDetails = () => {
    const [trailerToken, setTrailerToken] = useState<string | null>(null);
    const { list } = useContext(FavoriteContext);
    const { handleAddtoFavList, handleRemoveFromFavList, isLoading } = useFavorite();
    const { type, id } = useParams();
    const { data: details, isLoading: isDetailsLoading } = useCustomQuery({
        queryKey: ["trending", `${type}`, `${id}`],
        url: getDetails(type, Number(id)),
    });
    const isFavorite = Array.isArray(list) && list.find((item) => item.id === details?.id);

    const backdrop_IMG = `${baseUrl_IMG_BIG}${details?.backdrop_path}`;

    const playTrailer = () => {
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerToken}`;
        window.open(trailerUrl, '_blank');
    }

    const coloringRate = (number: number) => {
        if (number > 7) {
            return "text-green-500";
        } else {
            return "text-red-500";
        }
    };

    const coloringStatus = (status: string) => {
        if (status === "Released") {
            return "text-green-500";
        } else {
            return "text-red-500";
        }
    }

    const renderGenres = details?.genres.map(({ id, name }: IGenre) => (
        <div key={id} className="text-white hover:bg-black/20 border rounded-md py-1 px-3 w-fit">
            {name}
        </div>
    ))
    const renderCast = details?.credits?.cast.slice(0, 5).map(({ id, name, profile_path }: ICast) => (
        <CustomTooltip key={id} text={name}>
            <div
                style={{
                    backgroundImage: `url(${baserUrl_IMG_EXTRA_SMALL}${profile_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="bg-gray-300 size-12 rounded-full cursor-pointer filter grayscale hover:grayscale-0 transition duration-200"
            ></div>
        </CustomTooltip>
    ))

    const handleClick = () => {
        if (isFavorite) {
            handleRemoveFromFavList(details?.id);
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

    const dataShow: IData_show = {
        id: details?.id,
        media_type: type,
        overview: details?.overview,
        poster_path: details?.poster_path,
        release_date: details?.release_date || details?.first_air_date,
        title: details?.title || details?.name,
        vote_average: details?.vote_average.toFixed(1),
    }



    useEffect(() => {
        if (details) {
            const trailerObj = details?.videos.results.find((video: { site: string, type: string }) => video.site == "YouTube" && video.type == "Trailer")
            if (trailerObj) {
                setTrailerToken(trailerObj.key);
            }
        }
    }, [details])



    return (
        <div className="relative bg-fixed w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backdrop_IMG})` }} >
            <div className="relative z-20 w-full h-full grid grid-rows-[64px_auto_1px_auto] px-6 gap-y-6 py-4 md:py-14">
                <div></div>
                {
                    isDetailsLoading ? <DetailsSkeleton /> :
                        <div className="text-white space-y-3">
                            <div className="flex items-center gap-3 font-medium">
                                <div>
                                    <Badge className="text-[15px] text-white" variant={"outline"}>{type} {getTheYear(details?.release_date || details?.first_air_date)}</Badge>
                                </div>
                                <span>
                                    {details?.origin_country[0]}
                                </span>
                            </div>
                            <h1 className="font-medium text-6xl text-wrap">{details?.original_name || details?.title}</h1>
                            <p className="text-wrap text-white/70 text-sm">{details?.overview}</p>
                            <div>
                                <span>{details?.tagline}</span>
                            </div>
                            <div>
                                <span>Original language : <span className="font-medium">{details?.original_language}</span></span>
                            </div>
                            <div>
                                <span>Status : <span className={`font-medium ${coloringStatus(details?.status)}`}>{details?.status}</span></span>
                            </div>
                            <div>
                                <span>
                                    Rating: <span className={`font-medium ${coloringRate(details?.vote_average)}`}>{Number(details?.vote_average).toFixed(1)}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button onClick={handleClick} className="bg-white hover:bg-gray-300 text-black px-5 font-bold text-[18px] rounded-full flex items-center gap-2">
                                    {buttonText}
                                </Button>
                                <Button disabled={trailerToken === null} onClick={playTrailer} variant={"outline"} className="bg-transparent text-white px-5 font-bold text-[18px] rounded-full flex items-center gap-2">
                                    Trailer <Play />
                                </Button>
                            </div>
                        </div>
                }

                <div className="bg-white/50 w-full"></div>
                <div className="w-full space-y-6">
                    {
                        isDetailsLoading ? <GenresSkeleton /> :
                            <div className="flex flex-wrap items-center gap-3">
                                {renderGenres}
                            </div>
                    }
                    {
                        isDetailsLoading ? <CastSkeleton /> :
                            <div className="flex flex-wrap gap-3">
                                {renderCast}
                            </div>
                    }
                    <div className="w-full">
                        <Row title="You may also Like " apiUrl={discover(type, details?.genres[0].id, 1)} />
                    </div>
                </div>
            </div>
            <Gradiant />
        </div>
    )
}

export default ShowDetails