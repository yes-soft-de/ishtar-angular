import {SearchListItem} from '../entity/search-list-item';

export interface SearchResponse {
  status_code: string;
  msg: string;
  Data: SearchListItem[];
}
