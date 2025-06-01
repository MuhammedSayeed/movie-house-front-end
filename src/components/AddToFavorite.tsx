import useFavorite from '@/hooks/useFavorite'
import { IData_show } from '@/interfaces'
import { Plus } from 'lucide-react'




interface IProps {
    show: IData_show,
}
const AddToFavorite = ({ show }: IProps) => {

    const {handleAddtoFavList , isLoading} = useFavorite();

    return (
        <button disabled = {isLoading} onClick={()=> handleAddtoFavList(show)} className="font-medium text-white border-2 hover:bg-white transition-colors duration-200 hover:text-primary px-3 rounded-md">
            {isLoading ? <div className="animate-pulse">Loading...</div>  : <div className='flex items-center gap-1'>Add <Plus size={15} /></div> }
        </button>

    )
}

export default AddToFavorite