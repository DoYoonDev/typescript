import { SimplifiedAlbum } from "./album";
import { SimplifiedArtist } from "./artist";
import { ExternalIds, ExternalUrls, Restrictions } from "./commonType";
import { Episode } from "./episode";


export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track?: Track | Episode;
  type?: string;
  uri?: string;
}

export interface Track {
  album?: SimplifiedAlbum;
  artists?: SimplifiedArtist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  //   preview_url?:
  //     | string
  //     | null /** @deprecated This field is deprecated by Spotify */;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}