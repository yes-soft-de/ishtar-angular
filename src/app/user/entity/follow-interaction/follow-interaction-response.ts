import {FollowInteractionListItem} from './follow-interaction-list-item';

export interface FollowInteractionResponse {
  status_code: string;
  msg: string;
  Data: FollowInteractionListItem[];
}
