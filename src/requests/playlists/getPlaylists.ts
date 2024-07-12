import { $api, BASE_URL } from '../../config/api';

export const getPlaylists = async () => {
  const result = await $api.get(`${BASE_URL}/users/playlists/`);

  return { results: result.data }
}
