import {PaintingImgItem} from './painting-img-item';

export interface PaintingImgResponse {
  status_code: string;
  msg: string;
  Data: PaintingImgItem[];
}
