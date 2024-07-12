import { $api, BASE_URL } from '../../config/api';

type Params = {
  title: string,
}

export const addPlaylist = async (params: Params) => {
  const {
    title,
  } = params

  const result = await $api.post(`${BASE_URL}/users/playlists/`, { title });

  return result
}
