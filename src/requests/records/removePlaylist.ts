import { $api, BASE_URL } from '../../config/api';

export const removeRecords = async () => {
  const result = await $api.delete(
    `${BASE_URL}/users/records/`,
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    },
  );

  return result.data
}

export const removeRecordItem = async (eventId: number) => {
  const result = await $api.delete(
    `${BASE_URL}/users/records/${eventId}/`,
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    },
  );

  return result.data
}
