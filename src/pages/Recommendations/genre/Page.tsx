import RecommendationCard from "@/components/RecommendationCard";
import { MoviesGenres, TvGenres } from "@/constants";
import { IGenre } from "@/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const GenrePage = () => {
  const [genres, setGenres] = useState<IGenre[] | null>(null);;
  const { type } = useParams();


  const specifyGenre = () => {
    if (type === "movie") {
      setGenres(MoviesGenres)
    } else {
      setGenres(TvGenres)
    }
  }
  useEffect(() => {
    specifyGenre();
  }, [type])

  const renderGenres = genres?.map(({ id, name, style }) => (
    <RecommendationCard className={`${style} bg-second-dark text-center rounded-lg py-7 px-3 hover:scale-[1.05] transition-transform duration-300 ease-in-out `} key={id} path={`/recommendations/${type}/${id}/${name}/results`}>
      <span className="text-white text-xl font-medium">{name}</span>
    </RecommendationCard>
  ))

  return (
    <div className="space-y-6 mt-10 md:mt-20" >
      <h1 className="text-3xl text-center text-white font-medium animate-pulse">Select {type} Genre</h1>
      <div className=" max-w-2xl mx-auto grid grid-cols-3 gap-3">
        {renderGenres}
      </div>
    </div>
  )
}

export default GenrePage