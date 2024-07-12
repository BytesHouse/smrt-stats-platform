import { $api, BASE_URL } from '../../config/api';

type Params = {
  end_second: number,
  event: string,
  start_second: number,
}

export const recordPlaylist = async (params: Params) => {
  const result = await $api.post(
    `${BASE_URL}/users/records/`,
    params,
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    },
  );

  return result.data
}
