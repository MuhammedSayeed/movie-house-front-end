import { SHOW_TYPES } from '@/constants';
import { Button } from './ui/button';


interface IProps {
    activeType : "all" | "movie" | "tv"
    setActiveType : React.Dispatch<React.SetStateAction<"all" | "movie" | "tv">>;
}
const TypesFilter = ({activeType , setActiveType} : IProps) => {



    return (
        <div className="flex space-x-4 items-center flex-wrap justify-center h-fit">
            {
                SHOW_TYPES.length > 0 && SHOW_TYPES.map(({ label, value }) => {
                    const isActive = value === activeType;
                    return <Button onClick={()=> setActiveType(value)} className={`font-medium bg-transparent hover:bg-white hover:text-primary transition-colors duration-200 ${isActive ? "bg-white text-primary" : "text-white"} border-2 px-3 rounded-md mb-3`} key={value}>{label}</Button>
                })
            }
        </div>
    )
}

export default TypesFilter