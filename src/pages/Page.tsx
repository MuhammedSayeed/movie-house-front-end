import Gradiant from "../components/Gradiant";
import Row from "../components/Row";
import { topRated, trending } from "../services/api";
import useCustomQuery from "@/hooks/useCustomQuery";
import {useMemo } from "react";
import BilboardSkeleton from "@/skeleton/Bilboard";
import Bilboard from "@/components/Bilboard";
import { IBilboard } from "@/interfaces";



const HomePage = () => {
  const { data: trendingShows } = useCustomQuery({
    queryKey: ["trending"],
    url: trending,
  });


  const randomShow = useMemo(() => {
    if (!trendingShows?.results) return null;
    const shows = trendingShows.results;
    const randomIndex = Math.floor(Math.random() * shows.length);
    return shows[randomIndex] as IBilboard;
  }, [trendingShows]);



  return (
    <div style={{ backgroundImage: randomShow ? `url("https://image.tmdb.org/t/p/w1280${randomShow.backdrop_path}")` : "none" }} className="w-full min-h-screen h-full px-6 bg-cover bg-center bg-fixed relative object-cover">
      <div className="relative h-full z-[4] grid grid-rows-[64px_1fr_1fr] gap-y-5">

        <div>
        </div>
        <div className="text-white h-full pt-8 md:pt-14 ">
          {randomShow ? (
            <Bilboard bilboard={randomShow} />
          ) : (
            <BilboardSkeleton />
          )}
        </div>
        <div className="grid grid-rows-2  ">
          <div>
            <Row apiUrl={trending} title="Trending" />
          </div>
          <div>
            <Row apiUrl={topRated} title="Top rated" />
          </div>
        </div>
      </div>
      <Gradiant />
    </div>
  );
};

export default HomePage;
