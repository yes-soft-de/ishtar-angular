import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ImageListResponse} from '../../entity/image/image-list-response';
import {PaintingDetails} from '../../entity/painting-details/painting-details';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingDetails(paintingId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'none'
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
