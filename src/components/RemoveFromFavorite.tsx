import useFavorite from '@/hooks/useFavorite';
import { Minus } from 'lucide-react'


interface IProps {
  id: number;
}
const RemoveFromFavorite = ({ id }: IProps) => {

  const {handleRemoveFromFavList , isLoading} = useFavorite();

  return (
    <button onClick={()=> handleRemoveFromFavList(id)} className="font-medium flex items-center gap-1 bg-white hover:bg-gray-300 transition-colors duration-200 text-primary px-2 py-[2px] rounded-md">
      {isLoading ? <div className="animate-pulse">Loading...</div> : <div className='flex items-center gap-1'>Remove <Minus size={15} /></div>}
    </button>
  )
}

export default RemoveFromFavorite