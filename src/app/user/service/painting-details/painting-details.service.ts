import {Injectable} from '@angular/core';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {Config} from '../../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingDetails(paintingId: string) {
    return this.httpClient.get<PaintingInterface>(
      `${Config.paintingAPI}${paintingId}`, {responseType: 'json'}
    );
  }
}
