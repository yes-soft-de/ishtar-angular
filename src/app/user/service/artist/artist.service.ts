import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtistListResponse} from '../../entity/artist-list/artist-list-response';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) {
  }

  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  requestArtistList() {
    return this.httpClient.get(`${UserConfig.artistsAPI}`)
        .pipe(catchError(ArtistService.errorHandler));
  }
  // requestArtistList() {
  //   return this.httpClient.get<ArtistListResponse>(
  //     `${UserConfig.ArtistListAPI}`, {responseType: 'json'}
  //   );
  // }

  requestArtistDetails(artistId: any) {
    return this.httpClient.get(`${UserConfig.artistAPI}/${artistId}`);
  }
  // requestArtistDetails(artistId: any) {
  //   const request: {
  //     artist: string
  //   } = {
  //     artist: artistId
  //   };
  //   return this.httpClient.post<{ Data: ArtistDetails[] }>(
  //       UserConfig.ArtistDetailsAPI,
  //       JSON.stringify(request)
  //   );
  // }

  getPaintingNumber(artistId: string) {
    const request: { parm: string, value: string } = {parm: 'artist', value: artistId};
    return this.httpClient.post<{Data: []}>(UserConfig.getByAPI, request);
  }

  /*
   requestArtistDetails(artistId: any) {
      const request: {
        artist: string
      } = {
        artist: artistId
      };
      return this.httpClient.post<{ Data: ArtistDetails[] }>(
        `${UserConfig.artistAPI}/${artistId}`,
        JSON.stringify(request)
      ).pipe(catchError(UserArtistService.errorHandler));
    }

    getPaintingNumber(artistId: string) {
      const request: { parm: string, value: string } = {parm: 'artist', value: artistId};
      return this.httpClient.post<{Data: []}>(
        `${UserConfig.artistAPI}/${artistId}`,
         request

      ).pipe(catchError(UserArtistService.errorHandler));
    }
  */


  requestPaintingListByArtType(id: string) {
    return this.httpClient.post<ArtistListResponse>(
      UserConfig.getByAPI,
      {
        param: 'artist',
        value: id
      }
    );
  }



  /*
    requestPaintingList() {
      return this.httpClient.get<ArtistListResponse>(
        `${UserConfig.artistsAPI}`, {responseType: 'json'}
      ).pipe(catchError(PaintingService.errorHandler));
    }

    requestPaintingListByArtType(id: string) {
      return this.httpClient.post<ArtistListResponse>(
        `${UserConfig.artistAPI}/${id}`,
        {
          parm: 'artist',
          value: id
        }
      );
    }
  */
}
