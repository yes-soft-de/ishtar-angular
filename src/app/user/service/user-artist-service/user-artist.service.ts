import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtistDetails} from '../../entity/artist/artist-details';
import {share, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserArtistService {

  constructor(private httpClient: HttpClient) {
  }

  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  
  requestArtistDetails(artistId: any) {
    const request: {
      artist: string
    } = {
      artist: artistId
    };
    return this.httpClient.post<{ Data: ArtistDetails[] }>(
      UserConfig.ArtistDetailsAPI,
      JSON.stringify(request)
    );
  }

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

}
