import {PaintingListItem} from './painting-list-item';

export interface PaintingListResponse {
  status_code: string;
  msg: string;
  Data: PaintingListItem[];
}
