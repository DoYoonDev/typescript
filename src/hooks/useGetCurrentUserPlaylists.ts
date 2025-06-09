import { useQuery } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['current-user-playlists'],
        queryFn: () => {
            return getCurrentUserPlaylists({ limit, offset });
        },
        enabled: options?.enabled !== false
    })
}

export default useGetCurrentUserPlaylists;