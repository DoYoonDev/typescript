import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { EpisodeObject, TrackObject } from "./track";

export interface GetCurrentUserPlaylistRequest {
    limit?: number,
    offset?: number
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
    collaborative?: boolean,
    description?: string | null,
    external_urls?: ExternalUrls,
    href?: string,
    id?: string,
    images?: Image[],
    name?: string,
    owner?: Owner,
    public?: boolean,
    snapshot_id?: string,
    type?: "playlist",
    uri?: string
}

export interface SimplifiedPlaylist extends BasePlaylist {
    tracks?: {
        href?: string,
        total?: number
    },
}

export interface Playlist extends BasePlaylist {
    tracks: ApiResponse<PlaylistTrack>;
    followers: Followers;
}

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null;
    is_local?: boolean;
    track: TrackObject | EpisodeObject;
}

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    offset?: number;
    limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface CreatePlaylistRequest {
    name: string;
    playlistPublic?: boolean;
    collaborative?: boolean;
    description?: string;
}

export interface AddTrackToPlaylistRequest {
  playlist_id: string;
  position?: number;
  uris?: string[];
}

export interface AddTrackToPlaylistResponse {
  snapshot_id: string;
}