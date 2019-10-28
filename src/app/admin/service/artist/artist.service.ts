import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {AdminConfig} from '../../AdminConfig';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {Artist} from '../../entity/artist/artist';
import { catchError } from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {ArtistListResponse} from '../../entity/ArtistList/artist-list-response';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {}

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Artist
  getAllArtists() {
    return this.httpClient.get(
        AdminConfig.artistsAPI,
      {responseType: 'json'}
    ).pipe(catchError(ArtistService.errorHandler));
  }
  // getAllArtists() {
  //   return this.httpClient.get<ArtistListResponse>(
  //       `${AdminConfig.allArtistsAPI}`, {responseType: 'json'}
  //   ).pipe(catchError(ArtistService.errorHandler));
  // }

  // get artist detail
  getArtistByArtist(artistId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.get(
        `${AdminConfig.artistAPI}/${artistId}`,
        {responseType: 'json'}
    );
  }
  // getArtistByArtist(artistId: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.httpClient.post<ArtistInterface>(
  //       AdminConfig.artistAPI,
  //       JSON.stringify({artist: artistId}),
  //       httpOptions
  //   );
  // }


  // Admin Section - Add Artist Page
  postAddArtist(artist: Artist) {
    return this.httpClient.post<Artist>(
        `${AdminConfig.artistsAPI}`,
        JSON.stringify(artist),
        {responseType: 'json'}
    );
  }

  // Admin Section - Update Artist
  updateArtist(artistId: string, data: ArtistInterface) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.put<ArtistInterface>(
        `${AdminConfig.artistAPI}/${artistId}`,
        JSON.stringify(data),
        {responseType: 'json'}
    ).pipe(catchError(ArtistService.errorHandler));
  }
  // updateArtist(artistId: string, data) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.httpClient.post<ArtistInterface>(
  //       AdminConfig.editArtistAPI,
  //       JSON.stringify(data),
  //       httpOptions
  //   ).pipe(catchError(ArtistService.errorHandler));
  // }


  // Admin Section - Delete Artist
  deleteArtist(artistId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(
        AdminConfig.deleteArtistAPI,
        JSON.stringify({id: artistId}),
        httpOptions
    ).pipe(catchError(ArtistService.errorHandler));
  }

  // Admin Section - Uplaod Image For Artist
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<{
      url: string
    }>(`${AdminConfig.generalUploadAPI}`, formData);
  }

}
