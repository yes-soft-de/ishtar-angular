import {LoveInteractionListItem} from './love-interaction-list-item';

export interface LoveInteractionResponse {
  status_code: string;
  msg: string;
  Data: LoveInteractionListItem[];
}
