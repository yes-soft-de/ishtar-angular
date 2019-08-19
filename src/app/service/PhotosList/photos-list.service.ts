import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {FeaturedInterface} from '../../entity/featured/featuredInterface';
import {Config} from '../../config/config';
import {config} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private httpClient: HttpClient) {
  }

  getPhotosList() {
    // This Should Take the List From the API
    return this.httpClient.get<PaintingFullList>(Config.fullImagesListAPI, {responseType: 'json'});
  }
}
