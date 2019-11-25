import {StatueObject} from '../entity/statue-object';

export interface StatueListResponse {
  status_code: string;
  msg: string;
  Data: StatueObject[];
}
