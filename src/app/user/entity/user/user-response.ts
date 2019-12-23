import {UserInfo} from '../../entity-protected/profile/user-info';

export interface UserResponse {
  status_code?: number;
  Data?: UserInfo;
}
