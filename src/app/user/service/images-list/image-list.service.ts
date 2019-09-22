import {Injectable} from '@angular/core';
import {ImageRequest} from '../../entity/image/image-request';
import {HttpClient} from '@angular/common/http';
import {ImageListResponse} from '../../entity/image/image-list-response';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  constructor(private httpClient: HttpClient) {
  }

  getImagesList(id: number) {
    const postBody: ImageRequest = {
      painting: id
    };
    return this.httpClient.post<ImageListResponse>(
      UserConfig.PaintingImageAPI,
      postBody,
      {responseType: 'json'}
    );
  }
}
