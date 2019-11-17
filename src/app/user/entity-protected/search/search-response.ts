import {SearchItem} from './search-item';

export interface SearchResponse {
  status_code: string;
  msg: string;
  Data: SearchItem[];
}
