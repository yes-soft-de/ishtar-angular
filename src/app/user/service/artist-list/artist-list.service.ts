import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaintingListResponse} from '../../entity/painting-list/painting-list-response';
import {UserConfig} from '../../UserConfig';
import {ArtistListResponse} from '../../entity/artist-list/artist-list-response';

@Injectable({
  providedIn: 'root'
})
export class ArtistListService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingList() {
    return this.httpClient.get<ArtistListResponse>(
      `${UserConfig.ArtistListAPI}`, {responseType: 'json'}
    );
  }

  requestArtistList() {
    return this.httpClient.get<ArtistListResponse>(
      `${UserConfig.ArtistListAPI}`, {responseType: 'json'}
    );
  }

  requestPaintingListByArtType(id: string) {
    return this.httpClient.post<ArtistListResponse>(
      UserConfig.getByAPI,
      {
        parm: 'artist',
        value: id
      }
    );
  }
}
