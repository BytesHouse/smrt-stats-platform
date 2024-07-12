/* eslint-disable consistent-return */
import { $api, BASE_URL } from '../../config/api';

type Params = {
  event: Array<{
    end_second?: number,
    event_id: number,
    start_second?: number,
    title?: string | undefined,
  }>,
  playlistId: number,
}
// Закомментированная функция срабатывала несколько раз,
// ввиду чего происходила многократное включение записанного ролика в плейлист
/* export const addEventsToPlaylist = async (params: Params) => {
  const {
    event,
    playlistId,
  } = params
  const result = await $api.post(`${BASE_URL}/users/playlists/${playlistId}/add/`, event);
  return result
} */

interface AddEventsToPlaylistFunction extends Function {
  isExecuting: boolean;
}

export const addEventsToPlaylist: AddEventsToPlaylistFunction = async (params: Params) => {
  if (addEventsToPlaylist.isExecuting) {
    return;
  }
  addEventsToPlaylist.isExecuting = true;

  const {
    event,
    playlistId,
  } = params

  try {
    const result = await $api.post(`${BASE_URL}/users/playlists/${playlistId}/add/`, event);
    return result;
  } finally {
    addEventsToPlaylist.isExecuting = false;
  }
};
addEventsToPlaylist.isExecuting = false;
