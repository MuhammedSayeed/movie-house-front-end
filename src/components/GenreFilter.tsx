import { useEffect, useState } from "react"
import { MoviesGenres, TvGenres } from "../constants";
import { IGenre } from "../interfaces";
import { NavLink, useParams } from "react-router-dom";




export const GenreFilter = () => {

  const [genres, setGenres] = useState<IGenre[]>([]);
  const {type , genre} = useParams();
  
  
  const SpecifyGenre = () => {
    if (type == 'movie') {
      setGenres(MoviesGenres)
    } else if (type == 'tv') {
      setGenres(TvGenres)
    }
  }

  useEffect(() => {
    SpecifyGenre();
  }, [type])

  return (
    <div className="flex space-x-4 items-center flex-wrap justify-center">
      {
        genres.length > 0 && genres.map(({id, name }) => {
          const isActive = genre === `${id}`;
          return <NavLink to={`/show/${type}/${id}`} className={`font-medium hover:bg-white hover:text-primary transition-colors duration-200 ${isActive ? "bg-white text-primary" : "text-white"} border-2 px-3 py-[6px] rounded-md mb-3`} key={id} >{name}</NavLink>
        })
      }
    </div>
  )
}
