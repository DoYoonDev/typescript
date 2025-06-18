import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddTrackToPlaylistRequest } from "../models/playlist";
import { addTrackToPlaylist } from "../apis/playlistApi";

const useAddTrackToPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddTrackToPlaylistRequest) => {
      const playlist_id: string = params.playlist_id;
      if (!params.playlist_id) throw new Error("playlist_id is missing");
      return addTrackToPlaylist(playlist_id, params);
    },
    onSuccess: () => {
      console.log("트랙 추가 성공");
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
    },
  });
};

export default useAddTrackToPlaylist;