import { ApiResponse } from "./apiResponse";
import { Image } from "./commonType";

export interface GetBrowseCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface BrowseCategoriesResponse {
  categories: ApiResponse<Category>;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}