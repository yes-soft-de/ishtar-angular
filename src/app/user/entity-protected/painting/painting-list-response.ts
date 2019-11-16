import {PaintingObject} from './painting-object';

export interface PaintingListResponse {
  status_code: string;
  Data: PaintingObject[];
  msg: string;
}
