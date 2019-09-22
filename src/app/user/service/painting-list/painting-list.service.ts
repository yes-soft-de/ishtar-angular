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
    return this.httpClient.get<PaintingListResponse>(UserConfig.PaintingListAPI);
  }

  requestPaintingListByArtist(artistId: string) {
    const artistRequest: {
      parm: string,
      value: string
    } = {
      parm: 'artist',
      value: artistId
    };
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.getByAPI,
      JSON.stringify(artistRequest)
    );

  }

  requestPaintingListByArtType(artId: string) {
    return this.httpClient.post<PaintingListResponse>(
      UserConfig.PaintingListAPI,
      JSON.stringify({artist: artId})
    );
  }
}
