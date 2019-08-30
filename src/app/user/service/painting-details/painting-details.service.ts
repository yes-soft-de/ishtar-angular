import {Injectable} from '@angular/core';
import {PaintingInterface} from '../../../admin/entity/painting/painting-interface';
import {Config} from '../../../admin/config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {PaintingDetailsResponse} from '../../entity/painting-details/painting-details-response';
import {ImageListResponse} from '../../entity/image/image-list-response';
import {PaintingDetails} from '../../entity/painting-details/painting-details';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingDetails(paintingId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const req: { painting: string } = {
      painting: paintingId
    };
    return this.httpClient.post<PaintingDetails>(
      UserConfig.PaintingDetailsAPI,
      JSON.stringify(req),
      httpOptions);
  }

  requestPaintingImages(paintingId: string) {
    let headers = new HttpHeaders({});
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.post<ImageListResponse>(
      `${UserConfig.PaintingImageAPI}`,
      {
        painting: paintingId
      }, {headers}
    );
  }

}
