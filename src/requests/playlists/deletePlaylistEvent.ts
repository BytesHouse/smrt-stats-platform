import { $api, BASE_URL } from '../../config/api';

type Params = {
  playlistEventId: number,
  playlistId: number,
}

export const deletePlaylistEvent = async (params: Params) => {
  const {
    playlistEventId,
    playlistId,
  } = params

  const result = await $api.delete(`${BASE_URL}/users/playlists/${playlistId}/${playlistEventId}/`);

  return result.data
}
