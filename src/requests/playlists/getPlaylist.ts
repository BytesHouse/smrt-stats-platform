import { $api, BASE_URL } from '../../config/api';

type Params = {
  playlistId: number,
}

export const getPlaylist = async ({ playlistId }: Params) => {
  const result = await $api.get(`${BASE_URL}/users/playlists/${playlistId}/`);

  return result.data
}
