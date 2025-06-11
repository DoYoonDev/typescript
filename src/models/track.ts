import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalIds, ExternalUrls, Restriction, Image, ResumePoint, Copyrights } from "./commonType";

export interface TrackObject {
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
    linked_from?: TrackObject;
    restrictions?: Restriction;
    name?: string;
    popularity?: number;
    preview_url?: string | null;
    track_number?: number;
    type?: "track";
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
    type: "episode";
    uri: string;
    restrictions?: Restriction;
    show: Show;
}

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