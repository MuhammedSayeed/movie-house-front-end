import { useInView } from "react-intersection-observer";
import { GenreFilter } from "../../components/GenreFilter";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { IShow } from "../../interfaces";
import CardList from "../../components/CardList";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import { extractShowData } from "@/lib/utils";
import CardListSkeleton from "@/skeleton/CardList";

const ShowList = () => {
  const { ref, inView } = useInView();
  const { type, genre } = useParams();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteScroll({ queryKey: ["showList"], genre, type })
  
  const RENDER_LIST = data?.pages.map((page) => page.results.map((show: IShow) => {
    if (show.poster_path) {
      const showData = extractShowData(show);
      return <CardList show={showData} key={show.id} />
    }
  }))

  const RENDER_SKELETON = Array.from({ length: 20 }, (_, index) => (
    <CardListSkeleton key={index} />
))


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className="w-full min-h-full px-6 grid grid-rows-[64px_auto_1fr_40px] gap-y-10 ">
      <div></div>
      <GenreFilter />
      <div className="h-full w-full mx-auto flex flex-wrap justify-center gap-5">
        {isLoading ? RENDER_SKELETON : RENDER_LIST}
      </div>
      {/* Element for oberve if user reach the end of page */}
      <div ref={ref} className="h-[40px] w-full flex justify-center items-center">
        {isFetchingNextPage && <Spinner color="white" size={25} />}
      </div>
    </div>
  );
};

export default ShowList;