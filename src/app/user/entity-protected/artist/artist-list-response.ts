import {ArtistObject} from './artist-object';

export interface ArtistListResponse {
  status_code: string;
  Data: ArtistObject[];
  msg: string;
}
