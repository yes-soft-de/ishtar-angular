import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {Config} from '../../config/config';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {Artist} from '../../entity/artist/artist';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

constructor(private router: Router,
            private route: ActivatedRoute,
            private httpClient: HttpClient) {}



  // Handling the error
  errorHandler(error: HttpErrorResponse){
    return throwError(error || "Server Error");
  }

  getAllArtists() {
    return this.httpClient.get<ArtistInterface>(
      `${Config.allArtistsAPI}`, {responseType: 'json'}
    ).pipe(catchError(this.errorHandler));
  }

  getArtistInfo(artistId: string) {
    // This Should Take the List From the API
    return this.httpClient.get<ArtistInterface>(
      `${Config.artistAPI}/${artistId}`,
      {responseType: 'json'});
  }

  getArtistPainting(artistId: string) {
    // This Should Take the List From the API
    return this.httpClient.get<PaintingFullList>(
      `${Config.artistPaintingsAPI}/${artistId}`,
      {responseType: 'json'});
  }

  // Admin Section - Add Artist Page
  postAddArtist(artist: Artist) {
    return this.httpClient.post<Artist>(
      `${Config.addArtistAPI}`, JSON.stringify(artist), {responseType: 'json'}
    ).subscribe(
      data => {
        // TODO insert ngx-toastr Message
        console.log('the post request was successfully done', data);
        // If Success Navigate to Admin Dashboard Page
      },
      error => {
        // TODO insert ngx-toastr Message
        console.log('there error from fetching the data', error);
      },
      () => {
        this.router.navigate(['admin/list-artist'], {relativeTo: this.route});
      }
    );
  }

}
