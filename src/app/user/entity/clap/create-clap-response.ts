import {UserInfo} from '../user/user-info';

export interface CreateClapResponse {
  status_code: number;
  msg: string;
  Data: {
    id: number;
    client: UserInfo;
    row: number;
    value: number;
    entity: {
      id: number;
      name: string;
    };
  };
}
