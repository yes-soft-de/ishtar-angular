import {UserInfo} from '../profile/user-info';

export interface CommentObject {
  comment: string;
  date: {
    timezone: { name: string; },
    timestamp: number;
  };
  spacial: boolean;
  username: string;
  userImage: string;
  id: number;
  body: string;
  editable: boolean;
}
