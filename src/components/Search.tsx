import { XCircleIcon } from "lucide-react"
import Modal from "./Modal"
import { Button } from "./ui/button"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { useState } from "react"
import useCustomQuery from "@/hooks/useCustomQuery"
import { useDebounce } from "@/hooks/useDebounce"
import { getSearchUrl } from "@/services/api"
import { IShow } from "@/interfaces"
import Spinner from "./Spinner"
import CardList from "./CardList"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/store"
import { toggleOpenSearch } from "@/app/slices/searchSlice"
import { extractShowData } from "@/lib/utils"
import Lottie from "lottie-react"
import Emptylist from "../animations/Emptylist.json"

const Search = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.search);
    const [activeTab, setActiveTab] = useState("movie");
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce({ value: query, delay: 500 });
    const { data, isLoading } = useCustomQuery({
        queryKey: ['searchResults', debouncedQuery, activeTab],
        url: getSearchUrl(debouncedQuery, activeTab),
        enabled: Boolean(debouncedQuery)
    });
    const results = data?.results ?? [];
    const totalResults = data?.results.length ?? 0;
    const handleClose = () => {
        setQuery('');
        setActiveTab("movie");
        dispatch(toggleOpenSearch(false));
    };
    const renderSearchResult = data?.results.map((show: IShow) => {
        if (show.poster_path) {
            const showData = extractShowData(show);
            return <CardList show={showData} key={show.id} />
        }
    })

    const renderSearchContent = () => {
        if (isLoading) {
            return (
                <div className="w-full flex justify-center">
                    <Spinner size={30} color="white" />
                </div>
            );
        }

        if (results.length > 0) {
            return (
                <div className="h-full w-full mx-auto grid grid-cols-[repeat(auto-fill,185px)] justify-center gap-5">
                    {renderSearchResult}
                </div>
            );
        }

        if (query) {
            return (
                <div className="text-center text-gray-400 mt-8 flex flex-col items-center">
                    <Lottie className="w-80 h-80" animationData={Emptylist} />
                    No results found for "{query}"
                </div>
            );
        }

        return null;
    };



    return (
        <Modal onClose={() => { }} isOpen={isOpen} >
            <div onClick={(e) => e.stopPropagation()} className="w-full h-full grid grid-rows-[100px_60px_1fr] px-6 gap-y-6 mb-10">
                <div className="flex items-end border-b-2">
                    <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="What are you Looking for?" type="text" className="w-full outline-none bg-transparent border-gray-400 text-gray-400 py-2 text-lg" />
                    {query.length > 0 && <Button onClick={() => setQuery('')} className="mb-2 rounded-full bg-transparent hover:bg-gray-900" size={"icon"}>
                        <XCircleIcon className="text-gray-300 hover:text-white" />
                    </Button>}
                </div>
                <div className="flex flex-wrap justify-between items-center">
                    <Tabs defaultValue="movie" className="w-[200px]" onValueChange={(value) => { setActiveTab(value) }}>
                        <TabsList className="grid w-full grid-cols-2 bg-gray-950/50 backdrop-blur-md text-gray-400">
                            <TabsTrigger value="movie" className="data-[state=active]:bg-second-extra-dark data-[state=active]:text-white">Movie</TabsTrigger>
                            <TabsTrigger value="tv" className="data-[state=active]:bg-second-extra-dark data-[state=active]:text-white" >Tv</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="w-full md:w-fit flex justify-end ">
                        <div className="flex items-center space-x-4  ">
                            <span className="text-gray-400">results : {totalResults}</span>
                            <Button onClick={handleClose} className="bg-white hover:bg-gray-300 border-none " variant={"outline"}>Close</Button>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto mt-6 md:mt-0">
                    {renderSearchContent()}
                </div>
            </div>
        </Modal>
    )
}

export default Search