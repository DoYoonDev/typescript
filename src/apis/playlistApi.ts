import {
  AddTrackToPlaylistRequest,
  AddTrackToPlaylistResponse,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  GetPlaylistResponse,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<GetPlaylistResponse> => {
  try {
    const response = await api.get(`playlists/${params.playlist_id}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
    // throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
    // throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<GetPlaylistResponse> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};

export const addTrackToPlaylist = async (
  playlist_id: string,
  params: AddTrackToPlaylistRequest
): Promise<AddTrackToPlaylistResponse> => {
  try {
    const response = await api.post(`/playlists/${playlist_id}/tracks`, {
      ...params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to add Track in playlist");
  }
};