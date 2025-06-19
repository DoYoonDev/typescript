import { ExternalUrls, Image, Restrictions } from "./commonType";
import { Show } from "./show";

export interface Episode {
  //   audio_preview_url:
  //     | string
  //     | null /** @deprecated This field is deprecated by Spotify */;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  //   language?: string /** @deprecated This field is deprecated by Spotify */;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, "show">;