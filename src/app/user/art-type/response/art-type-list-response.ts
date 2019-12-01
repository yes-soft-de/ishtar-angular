import {ArtTypeListItem} from '../entity/art-type-list-item';

export interface ArtTypeListResponse {
  status_code: string;
  msg: string;
  Data: ArtTypeListItem[];
}
