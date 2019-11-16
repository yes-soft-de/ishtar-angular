import {UserInfo} from '../profile/user-info';

export interface ClapObject {
  id: number;
  client: UserInfo;
  row: number;
  value: number;
  entity: {
    id: number;
    name: string;
  };
}
