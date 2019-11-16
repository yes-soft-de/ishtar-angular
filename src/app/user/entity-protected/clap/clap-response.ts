import {ClapObject} from './clap-object';

export interface ClapResponse {
  status_code: number;
  msg: string;
  Data: ClapObject;
}
