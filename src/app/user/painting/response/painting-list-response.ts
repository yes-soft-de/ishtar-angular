import {PaintingListItem} from '../entity/painting-list-item';

export interface PaintingListResponse {
  status_code: string;
  msg: string;
  Data: PaintingListItem[];
}
