import { $api, BASE_URL } from '../../config/api';

export const getRecords = async () => {
  try {
    const result = await $api.get(
      `${BASE_URL}/users/records/`,
      {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      },
    );
    return result?.data?.results
  } catch (e) {
    return []
  }
}
