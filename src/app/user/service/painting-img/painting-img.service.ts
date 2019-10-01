import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaintingImgResponse} from '../../entity/painting-img/painting-img-response';
import {UserConfig} from '../../UserConfig';
import {ImageRequest} from '../../entity/image/image-request';
import {ImageListResponse} from '../../entity/image/image-list-response';


@Injectable({
  providedIn: 'root'
})
export class PaintingImgService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingList() {
    return this.httpClient.get<PaintingImgService>(UserConfig.PaintingImageAPI);
  }

  
}
