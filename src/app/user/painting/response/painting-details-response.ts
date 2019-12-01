import {PaintingDetails} from '../entity/painting-details';

export interface PaintingDetailsResponse {
  status_code: string;
  msg: string;
  Data: PaintingDetails;
}
