import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";

export interface ExternalUrls {
    spotify: string
}
export interface Image {
    url: string,
    height: number | null,
    width: number | null
}
export interface Restriction {
    reason: string
}

export interface Followers {
    href?: string;
    total?: number;
}

export interface ExplictContent {
    filter_enabled?: boolean;
    filter_locked?: boolean;
}

export interface Owner {
    external_urls?: ExternalUrls,
    href?: string,
    id?: string,
    type?: string,
    uri?: string,
    display_name?: string | null
}

export interface ExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}

export interface ResumePoint {
    fully_played?: boolean;
    resume_position_ms?: number;
}

export interface Copyrights {
    text?: string;
    type?: string;
}