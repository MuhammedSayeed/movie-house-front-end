import { NavLink } from "react-router-dom"
import { baserUrl_posterSmall } from "../services/api"
import { IShow } from "../interfaces"

interface ICard {
  show : IShow
  first?: boolean

}
const Card = ({ first, show}: ICard) => {
  return (
    <NavLink className={`min-w-[92px] min-h-[138px] w-[92px] h-[138px]  ${first && "hover:translate-x-2"}  transition-transform hover:scale-[1.05] hover:border-2 duration-200 rounded-md cursor-pointer overflow-hidden`} to={`/show-details/${show.title? "movie" : "tv"}/${show.id}`}>
      <img className="object-cover h-full" loading="lazy" src={`${baserUrl_posterSmall}${show.poster_path}`} alt={show.title || show.name} />
    </NavLink>
  )
}

export default Card