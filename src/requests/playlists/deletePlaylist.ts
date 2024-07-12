import { $api, BASE_URL } from '../../config/api';

type Params = {
  playlistId: number,
}

export const deletePlaylist = async (params: Params) => {
  const {
    playlistId,
  } = params

  const result = await $api.delete(`${BASE_URL}/users/playlists/${playlistId}/`);
  await $api.post('/users/activity/', {
    entity_id: playlistId,
    type: 2,
  })

  return result.data
}
