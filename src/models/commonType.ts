export interface ExternalUrls {
  external_urls: {
    spotify?: string;
  };
}
export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}
export interface Restrictions {
  reason?: string;
}

export interface Followers {
  href?: string | null;
  total?: number;
}

export interface ExplicitContent {
  filter_enabled?: boolean;
  filter_locked?: boolean;
}

export interface Owner {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Copyrights {
  text?: string;
  type?: "C" | "P";
}