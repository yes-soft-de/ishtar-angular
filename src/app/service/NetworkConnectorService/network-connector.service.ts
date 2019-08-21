import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ArtistInterface} from '../../entity/user/artist/artist-interface';
import {pipe} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
import {Artist} from '../../entity/user/artist/artist';
import {Config} from '../../config/config';
import {ArtistFeaturedInterface} from '../../entity/user/artist-painting/artist-featured-interface';
import {PaintingInterface} from '../../entity/user/painting/painting-interface';
import {FeaturedInterface} from '../../entity/user/featured/featuredInterface';
import {ArtistAdmin} from '../../entity/admin/artist/artist-admin';
import {ArtistAdminInterface} from '../../entity/admin/artist/artist-admin-interface';


@Injectable({
  providedIn: 'root'
})
export class NetworkConnectorService {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {}

  requestArtistDetails(id: string) {
    return this.httpClient.get<ArtistInterface>(
      `${Config.artistAPI}${id}`, {responseType: 'json'}
    );
  }

  requestArtistFeatured(artistId: string) {
    return this.httpClient.get<ArtistFeaturedInterface>(
      `${Config.artistFeaturedPaintings}${artistId}`, {responseType: 'json'}
    );
  }

  requestPaintingDetails(paintingId: string) {
    return this.httpClient.get<PaintingInterface>(
      `${Config.paintingAPI}${paintingId}`, {responseType: 'json'}
    );
  }

  requestFeatured() {
    return this.httpClient.get<FeaturedInterface>(
      `${Config.featuredAPI}`, {responseType: 'json'}
    );
  }

  // Admin Section - List Artist Page
  requestListAdminArtists() {
    return this.httpClient.get<ArtistAdminInterface>(
      `${Config.listArtistAPI}`, {responseType: 'json'}
    );
  }

  // Admin Section - Add Artist Page
  postAddArtist(artist: ArtistAdmin) {
    return this.httpClient.post<ArtistAdmin>(
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
        console.log('there error from fetching the data', error)
      }
    );
  }


}
