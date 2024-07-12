import axios from 'axios';
import { VIDEO_SERVICE_URL } from '../config/api';

type CutType = {
  end: number,
  path: string,
  start: number,
}

type Params = Array<CutType>

export const combineCuts = async (params: Params) => {
  const result = await axios.post(
    `${VIDEO_SERVICE_URL}/cut_many_video/?out=file`,
    params,
  );

  return result.data
}
