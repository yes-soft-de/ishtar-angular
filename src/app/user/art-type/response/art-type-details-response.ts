import {ArtTypeDetails} from '../entity/art-type-details';

export interface ArtTypeDetailsResponse {
  status_code: string;
  msg: string;
  Data: ArtTypeDetails;
}
