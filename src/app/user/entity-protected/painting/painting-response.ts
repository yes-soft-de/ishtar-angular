import {PaintingObject} from './painting-object';

export interface PaintingResponse {
  status_code: string;
  Data: PaintingObject;
  msg: string;
}
