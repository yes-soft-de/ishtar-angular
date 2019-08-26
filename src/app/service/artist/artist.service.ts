import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {Config} from '../../config/config';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {Artist} from '../../entity/artist/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

constructor(private router: Router,
            private route: ActivatedRoute,
            private httpClient: HttpClient) {}

  getAllArtists() {
    return this.httpClient.get<ArtistInterface>(
      `${Config.allArtistsAPI}`, {responseType: 'json'}
    );
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
        console.log('the post request was successfully done');
        // If Success Navigate to Admin Dashboard Page
        this.router.navigate(['admin/list-artist'], {relativeTo: this.route});
      },
      error => {
        // TODO insert ngx-toastr Message
        console.log('there error from fetching the data', error);
      }
    );
  }

}
