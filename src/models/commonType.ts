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