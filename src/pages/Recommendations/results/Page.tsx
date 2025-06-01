import CardList from '@/components/CardList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import useCustomQuery from '@/hooks/useCustomQuery';
import { IShow } from '@/interfaces';
import { extractShowData, getRandomNumber } from '@/lib/utils';
import { getRecommenditons } from '@/services/api';
import { useParams } from 'react-router-dom'

const ResultsPage = () => {

  const { type, genre, label } = useParams();
  const { data, isLoading , isError } = useCustomQuery({
    queryKey: ["recommendations", `${type}`, `${genre}`],
    url: getRecommenditons(type, genre, getRandomNumber(10))
  })


  const RENDER_RESULTS = data?.results.slice(0,3).map((show: IShow) => {
    const showData = extractShowData(show);
    return <CardList show={showData} key={show.id} />
  })

  if (isError) {
    return (
      <div className="space-y-6 md:mt-44 flex flex-col items-center ">
        <h1 className="text-4xl text-center text-white font-bold">Hmmmm Can we try again?</h1>
        <Button className='bg-white text-primary font-bold hover:bg-gray-300' onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 md:mt-44" >
      <h1 className={`text-4xl text-center ${isLoading ? "text-white" : " text-second"} font-bold ${isLoading && "animate-pulse"}`}>{isLoading ? "Please Wait.." : `Top Results For ${label}`}</h1>
      {
        isLoading ?
          <div className="flex justify-center">
            <LoadingSpinner size={50} />
          </div> :
          <div className="w-full mx-auto flex flex-wrap justify-center gap-5">
            {data?.results.length > 0 && RENDER_RESULTS}
          </div>
      }
    </div>
  )
}

export default ResultsPage