import {StatueObject} from './statue-object';

export interface StatueResponse {
  status_code: string;
  Data: StatueObject;
  msg: string;
}
