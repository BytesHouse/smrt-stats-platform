import { $api, BASE_URL } from '../../config/api';

type Params = {
  playlistEventId: number,
  playlistId: number,
  title: string,
}

export const renamePlaylistEvent = async (params: Params) => {
  const {
    playlistEventId,
    playlistId,
    title,
  } = params
  const result = await $api.put(
    `${BASE_URL}/users/playlists/${playlistId}/${playlistEventId}/`,
    { title },
  );

  return result.data
}
