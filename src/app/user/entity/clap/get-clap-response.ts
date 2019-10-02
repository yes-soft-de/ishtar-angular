import {GetClapListItem} from './get-clap-list-item';

export interface GetClapResponse {
  status_code: number;
  msg: string;
  Data: GetClapListItem[];
}
