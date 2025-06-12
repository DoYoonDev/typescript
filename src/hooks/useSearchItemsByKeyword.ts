import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params:SearchRequestParams) => {
    const clientCredentialToken = useClientCredentialToken();
    return useInfiniteQuery({
        queryKey: ["search", params],
        queryFn: ({ pageParam = 0 }) => {
            if (!clientCredentialToken) {
                throw new Error("No token available");
            }
            return searchItemsByKeyword(clientCredentialToken, parmas);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {

        }
    })
}