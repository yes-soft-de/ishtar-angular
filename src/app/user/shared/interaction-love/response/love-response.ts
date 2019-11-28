import {LoveObject} from '../entity/love-object';

export interface LoveResponse {
  status_code: string;
  msg: string;
  Data: LoveObject;
}
