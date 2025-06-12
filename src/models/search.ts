import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylist } from "./playlist";
import { Show, SimplifiedAudioBook, SimplifiedEpisodeObject, TrackObject } from "./track";

export const enum SEARCH_TYPE {
    Tarck="track",
    Album="album",
    Playlist="playlist",
    Show="show",
    Episode="episode",
    AudioBook="audiobook",
    Artist="artist"
}

export interface SearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    track?: ApiResponse<TrackObject>;
    playlists?: ApiResponse<SimplifiedPlaylist>;
    show?: ApiResponse<Show>;
    episode?: ApiResponse<SimplifiedEpisodeObject>;
    audiobook?: ApiResponse<SimplifiedAudioBook>; 
}