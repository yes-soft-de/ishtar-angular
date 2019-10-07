import {PaintingViewsItem} from './painting-views-item';

export interface PaintingViewsResponse {
  status_code: string;
  msg: string;
  Data: PaintingViewsItem[];
}
