import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PaintingViewsResponse} from '../../entity/painting-views/painting-views-response';
import {UserConfig} from '../../UserConfig';
import { PaintingViewsItem } from '../../entity/painting-views/painting-views-item';



@Injectable({
  providedIn: 'root'
})
export class PaintingViewsService {

  constructor(private httpClient: HttpClient) {
  }

  requestPaintingViews(paintingViews: PaintingViewsItem){
    return this.httpClient.post<PaintingViewsItem>(
            `${UserConfig.paintingViewsAPI}`,
            JSON.stringify(paintingViews)
          );
  }

}
