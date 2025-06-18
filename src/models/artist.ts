import { ExternalUrls, Followers, Image } from "./commonType";

export interface SimplifiedArtist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: "artist";
  uri?: string;
}

export interface Artist extends SimplifiedArtist {
  followers?: Followers;
  genres?: string[];
  images?: Image[];
  popularity?: number;
}