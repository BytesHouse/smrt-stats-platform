import { $api, BASE_URL } from '../../config/api';

type Params = {
  playlistId: number,
  title: string,
}

export const renamePlaylist = async (params: Params) => {
  const {
    playlistId,
    title,
  } = params

  const result = await $api.put(
    `${BASE_URL}/users/playlists/${playlistId}/`,
    { title },
  );

  return result.data
}
