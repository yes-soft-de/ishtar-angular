import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {Config} from '../../config/config';
import {ArtistInterface} from '../../entity/artist/artist-interface';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private httpClient: HttpClient) {

  }

  getArtistInfo(artistId: string) {
    // This Should Take the List From the API
    return this.httpClient.get<ArtistInterface>(
      `${Config.artistAPI}/${artistId}`,
      {responseType: 'json'});
  }
}
