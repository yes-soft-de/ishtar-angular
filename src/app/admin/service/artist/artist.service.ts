import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {AdminConfig} from '../../AdminConfig';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {Artist} from '../../entity/artist/artist';
import {catchError} from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {ArtistListResponse} from '../../entity/ArtistList/artist-list-response';
import {ToastrService} from 'ngx-toastr';
import {IshtarClientService} from '../../../user/shared/client/ishtar-client.service';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService) {
  }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Artist
  getAllArtists(): Observable<ArtistListResponse> {
    return this.httpClient.get<ArtistListResponse>(
      AdminConfig.allArtistsAPI,
      {responseType: 'json'}
    ).pipe(catchError(ArtistService.errorHandler));
  }

  // get artist detail
  getArtistByArtist(artistId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(
      `${AdminConfig.artistAPI}/${artistId}`,
      {responseType: 'json'}
    );
  }

  // Admin Section - Add Artist Page
  postAddArtist(artist: Artist): Observable<Artist> {
    return this.ishtarClient.post(
      `${AdminConfig.artistsAPI}`,
      JSON.stringify(artist)
    );
  }

  // Admin Section - Update Artist
  updateArtist(artistId: number, data: ArtistInterface): Observable<Artist> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.ishtarClient.put(
      `${AdminConfig.artistAPI}/${artistId}`,
      JSON.stringify(data),
    ).pipe(catchError(ArtistService.errorHandler));
  }

  // Admin Section - Delete Artist
  deleteArtist(artistId: any): Observable<any> {
    return this.ishtarClient.delete(`${AdminConfig.artistAPI}/${artistId}`);
  }

  // Admin Section - Upload Image For Artist
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<{
      url: string
    }>(`${AdminConfig.generalUploadAPI}`, formData);
  }
}
