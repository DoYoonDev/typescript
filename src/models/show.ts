import { Copyrights, ExternalUrls, Image } from "./commonType";

export interface Show {
  available_markets: string[];
  copyrights: Copyrights[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export type RemoveTypeShow = Omit<Show, "type" | "is_externally_hosted">;