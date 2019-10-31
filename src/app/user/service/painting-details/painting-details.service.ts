import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ImageListResponse} from '../../entity/image/image-list-response';
import {PaintingDetails} from '../../entity/painting-details/painting-details';
import {PaintingDetailsResponse} from '../../entity/painting-details/painting-details-response';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaintingDetailsService {

  constructor(private httpClient: HttpClient) {  }
  
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }
  

  requestPaintingDetails(paintingId: string) {
    const req: { painting: string} = {
      painting: paintingId
    };
    return this.httpClient.post(
      `${UserConfig.PaintingDetailsAPI}`,
      JSON.stringify(req),
        {responseType: 'json'});
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
  
/*
 requestPaintingDetails(paintingId: string) {
    const req: { painting: string} = {
      painting: paintingId
    };
    return this.httpClient.post(
      `${UserConfig.paintingAPI}/${paintingId}`,
      JSON.stringify(req),
      {responseType: 'json'}
    ).pipe(catchError(PaintingDetailsService.errorHandler));
  }

requestPaintingImages(paintingId: string) {
  const req: { painting: string} = {
    painting: paintingId
  };
  let headers = new HttpHeaders({});
  headers = headers.set('Content-Type', 'application/json');
  return this.httpClient.post<ImageListResponse>(
    `${UserConfig.paintingAPI}/${paintingId}`,
    {
      painting: paintingId
    }, {headers}
  );
}
*/

}
