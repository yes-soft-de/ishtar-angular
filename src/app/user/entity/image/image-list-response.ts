import {ImageItem} from './image-item';

export interface ImageListResponse {
  status_code: string;
  msg: string;
  Data: ImageItem[];
}
