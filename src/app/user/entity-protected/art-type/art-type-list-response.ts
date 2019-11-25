import {ArtTypeObject} from './art-type-object';

export interface ArtTypeListResponse {
  status_code: string;
  msg: string;
  Data: ArtTypeObject;
}
