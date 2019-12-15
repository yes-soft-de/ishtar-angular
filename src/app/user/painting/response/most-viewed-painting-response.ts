import {MostViewedListItem} from '../entity/most-viewed-list-item';

export interface MostViewedPaintingResponse {
  status_code: string;
  msg: string;
  Data: MostViewedListItem[];
}
