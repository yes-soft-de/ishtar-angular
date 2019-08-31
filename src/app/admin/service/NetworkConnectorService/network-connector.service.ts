import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {pipe} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Artist} from '../../entity/artist/artist';
import {AdminConfig} from '../../AdminConfig';
import {ArtistFeaturedInterface} from '../../entity/artist-painting/artist-featured-interface';
import {PaintingInterface} from '../../entity/painting/painting-interface';
import {FeaturedInterface} from '../../entity/featured/featuredInterface';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectorService {
  constructor(private httpClient: HttpClient) {
  }

  requestArtistDetails(id: string) {
    return this.httpClient.get<ArtistInterface>(
      `${AdminConfig.artistAPI}${id}`, {responseType: 'json'}
    );
  }

  requestArtistFeatured(artistId: string) {
    return this.httpClient.get<ArtistFeaturedInterface>(
      `${AdminConfig.artistFeaturedPaintings}${artistId}`, {responseType: 'json'}
    );
  }

  requestPaintingDetails(paintingId: string) {
    return this.httpClient.get<PaintingInterface>(
      `${AdminConfig.paintingAPI}${paintingId}`, {responseType: 'json'}
    );
  }

  requestFeatured() {
    return this.httpClient.get<FeaturedInterface>(
      `${AdminConfig.featuredAPI}`, {responseType: 'json'}
    );
  }
}
