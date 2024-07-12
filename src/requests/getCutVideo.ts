import axios from 'axios';
import { VIDEO_SERVICE_URL } from '../config/api';

type Params = {
  end: number,
  path: string,
  start: number,
}

export const getCutVideo = async (params: Params) => {
  const result = await axios.post(
    `${VIDEO_SERVICE_URL}/cut_video/`,
    params,
  );

  return result
}
