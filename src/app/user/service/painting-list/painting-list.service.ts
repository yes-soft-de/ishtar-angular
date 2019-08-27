import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaintingListResponse} from '../../entity/painting-list/painting-list-response';
import {UserConfig} from '../../UserConfig';


@Injectable({
  providedIn: 'root'
})
export class PaintingListService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingList() {
    return this.httpClient.get<PaintingListResponse>(
      `${UserConfig.PaintingListAPI}`, {responseType: 'json'}
    );
  }
}
