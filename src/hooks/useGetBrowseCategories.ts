import { useQuery } from "@tanstack/react-query";
import {
  BrowseCategoriesResponse,
  GetBrowseCategoriesRequest,
} from "../models/categories";
import { getBrowseCategories } from "../apis/searchApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetBrowseCategories = (params?: GetBrowseCategoriesRequest) => {
  const token = useClientCredentialToken();
  const isEnabled = !!token;

  return useQuery<BrowseCategoriesResponse>({
    queryKey: ["browse-categories", params],
    queryFn: () => getBrowseCategories(token!, params),
    enabled: isEnabled,
  });
};

export default useGetBrowseCategories;