import {PaintingListItem} from './painting-list-item';

export interface PaintingFullList {
  status_code: number;
  data: PaintingListItem[];
}
