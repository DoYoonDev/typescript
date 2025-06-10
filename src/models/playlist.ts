import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalIds, ExternalUrls, Followers, Image, Owner, Restriction, ResumePoint, Show } from "./commonType";

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
    track: Track | EpisodeObject;
}

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface Track {
    album?: SimplifiedAlbum;
    artists?: Artist;
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_idx?: ExternalIds;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: {}
    restrictions?: Restriction;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    uri?: string;
    is_local?: boolean;
}

export interface EpisodeObject {
    audio_preview_url: string | null;
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
    language: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point?: ResumePoint;
    type: string;
    uri: string;
    restrictions?: Restriction;
    show: Show;
}