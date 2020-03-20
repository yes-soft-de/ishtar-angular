import {UserInfo} from '../entity/user-info';

export interface UserResponse {
  status_code?: number;
  Data?: UserInfo;
}
