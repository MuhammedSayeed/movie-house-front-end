import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios"


interface ICustomQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig
    enabled?: boolean;
}

const useCustomQuery = ({ url, queryKey, config, enabled }: ICustomQuery) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const { data } = await axios.get(url, config);
            return data;
        },
        enabled: enabled
    })
}

export default useCustomQuery