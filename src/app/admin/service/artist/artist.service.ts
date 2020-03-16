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
import {ArtistDetailsResponse} from '../../../user/artist/response/artist-details-response';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private ishtarClient: IshtarClientService,
              private httpClient: HttpClient) {
  }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Artist
  getAllArtists(): Observable<ArtistListResponse> {
    return this.ishtarClient.get(
      AdminConfig.allArtistsAPI
    ).pipe(catchError(ArtistService.errorHandler));
  }

  // get artist detail
  getArtistById(artistId: number): Observable<ArtistDetailsResponse> {
    return this.ishtarClient.get(
      `${AdminConfig.artistAPI}/${artistId}`
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
    return this.httpClient.post<{ url: string }>(`${AdminConfig.generalUploadAPI}`, formData);
  }
}
