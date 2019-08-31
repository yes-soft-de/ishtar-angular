import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaintingListResponse} from '../../entity/painting-list/painting-list-response';
import {UserConfig} from '../../UserConfig';
import {ImageRequest} from '../../entity/image/image-request';
import {ImageListResponse} from '../../entity/image/image-list-response';


@Injectable({
  providedIn: 'root'
})
export class PaintingListService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.get<PaintingListResponse>(
      `${UserConfig.PaintingListAPI}`,
      httpOptions
    );
  }

  requestPaintingListByArtist(artistId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.PaintingPaintingListByArtistAPI,
      JSON.stringify({artist: artistId}),
      httpOptions
    );
  }

  requestPaintingListbyArtType(artId: string) {
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.PaintingListAPI,
      JSON.stringify({artist: artId})
    );
  }
}
