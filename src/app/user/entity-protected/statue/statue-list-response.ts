import {StatueObject} from './statue-object';

export interface StatueListResponse {
  status_code: string;
  Data: StatueObject[];
  msg: string;
}
