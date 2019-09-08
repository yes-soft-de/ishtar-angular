import {ArtistListItem} from './artist-list-item';

export interface ArtistListResponse {
  status_code: string;
  msg: string;
  Data: ArtistListItem[];
}
