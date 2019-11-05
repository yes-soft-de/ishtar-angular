import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaintingListResponse} from '../../entity/painting-list/painting-list-response';
import {UserConfig} from '../../UserConfig';
import {ImageRequest} from '../../entity/image/image-request';
import {ImageListResponse} from '../../entity/image/image-list-response';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaintingListService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingList() {
    return this.httpClient.get<PaintingListResponse>(UserConfig.paintingsAPI);
  }
  // requestPaintingList() {
  //   return this.httpClient.get<PaintingListResponse>(UserConfig.PaintingListAPI);
  // }

  // Fetch Every Thing From Painting Table
  requestPaintingListBy(param: string, value: number) {
    return this.httpClient.get(`${UserConfig.paintingByAPI}/${param}/${value}`);
  }
  // requestPaintingListByArtist(artistId: string) {
  //   const artistRequest: {
  //     parm: string,
  //     value: string
  //   } = {
  //     parm: 'artist',
  //     value: artistId
  //   };
  //   return this.httpClient.post<PaintingListResponse>(
  //     UserConfig.getByAPI,
  //     JSON.stringify(artistRequest)
  //   );
  // }

  requestPaintingListByArtType(artId: string) {
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.PaintingListAPI,
      JSON.stringify({artist: artId})
    );
  }
  
/*
 public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  //Get All Paintings
  requestPaintingList() {
    return this.httpClient.get<PaintingListResponse>(
      `${UserConfig.paintingsAPI}`,
        {responseType: 'json'}
    ).pipe(catchError(PaintingListService.errorHandler));
  }

  //Get Paintings By Artist
  requestPaintingListByArtist(artistId: string) {
    const artistRequest: {
      parm: string,
      value: string
    } = {
      parm: 'artist',
      value: artistId
    };
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.paintingsAPI,
      JSON.stringify(artistRequest)
    ).pipe(catchError(PaintingListService.errorHandler));

  }

  //Get Paintings By Art Type
  requestPaintingListByArtType(artId: string) {
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.paintingsAPI,
      JSON.stringify({artist: artId})
    );
  }
*/
}
