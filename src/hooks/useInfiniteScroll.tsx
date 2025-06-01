import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IShow } from "../interfaces";
import { discover } from "../services/api";


interface ShowResponse {
    results: IShow[];
    page: number;
    total_pages: number;
}

interface IProps {
    queryKey: string[];
    type: string | undefined;
    genre: string | undefined;
}


export const useInfiniteScroll = ({ queryKey, genre, type }: IProps) => {
    return useInfiniteQuery({
        queryKey: [...queryKey, genre, type],
        queryFn: async ({ pageParam = 1 }) => {
            const endpointType = type === 'tv' ? 'tv' : 'movie';
            const { data } = await axios.get<ShowResponse>(discover(endpointType, genre, pageParam));
            return data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    })
}
