import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {Artist} from '../../entity/artist/artist';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {IshtarAdminClientService} from '../../client/ishtar-admin-client.service';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: IshtarAdminClientService) {
  }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Artist
  getAllArtists() {
    return this.httpClient.get(
      AdminConfig.allArtistsAPI
    ).pipe(catchError(ArtistService.errorHandler));
  }

  // getAllPaintings() {
  //   return this.httpClient.get<ArtistListResponse>(
  //       `${AdminConfig.allArtistsAPI}`, {responseType: 'json'}
  //   ).pipe(catchError(ArtistService.errorHandler));
  // }

  // get artist detail
  getArtistByArtist(artistId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.get(
      `${AdminConfig.artistAPI}/${artistId}`
    );
  }

  // Admin Section - Add Artist Page
  postAddArtist(artist: Artist): Observable<Artist> {
    return this.httpClient.post(
      `${AdminConfig.artistsAPI}`,
      JSON.stringify(artist)
    );
  }

  // Admin Section - Update Artist
  updateArtist(artistId: number, data: ArtistInterface) {
    return this.httpClient.put(
      `${AdminConfig.artistAPI}/${artistId}`,
      JSON.stringify(data)
    ).pipe(catchError(ArtistService.errorHandler));
  }


  // Admin Section - Delete Artist
  deleteArtist(artistId: any) {
    return this.httpClient.delete(`${AdminConfig.artistAPI}/${artistId}`);
  }

  // Admin Section - Uplaod Image For Artist
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post(`${AdminConfig.generalUploadAPI}`, formData);
  }

}
