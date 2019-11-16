import {ArtistObject} from './artist-object';

export interface ArtistResponse {
  status_code: string;
  Data: ArtistObject;
  msg: string;
}
