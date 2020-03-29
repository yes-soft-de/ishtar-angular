import {PaintingListItem} from './painting-list-item';

export interface PaintingFullList {
  status_code: number;
  result_size: number;
  data: PaintingListItem[];
}
