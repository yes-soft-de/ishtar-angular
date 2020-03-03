import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaintingDetailsResponse } from '../response/painting-details-response';
import { EMPTY, Subject, Observable } from 'rxjs';
import {UserConfig} from '../../UserConfig';
import {PaintingListResponse} from '../response/painting-list-response';
import {MostViewedPaintingResponse} from '../response/most-viewed-painting-response';
import { IshtarClientService } from '../../shared/client/ishtar-client.service';

@Injectable({
  providedIn: 'root'
})
/**
 * PaintingRepository Class Is To Connect To Http Request
 */
export class PaintingRepositoryService {

  constructor(private httpClient: IshtarClientService) { }

  // Fetch All Paintings
  getPaintings(): Observable<PaintingListResponse> {
    return this.httpClient.get(UserConfig.paintingsAPI);
  }

  // Fetch Painting Detail
  getPainting(paintingId: number): Observable<PaintingDetailsResponse> {
    return this.httpClient.get(`${UserConfig.paintingAPI}/${paintingId}`);
  }

  // Fetch Every Thing From Painting Table ex: param -> paintingColumnName as artist, value -> paintingColumnValue as 2
  getPaintingListBy(param: string, value: number): Observable<any> {
    return this.httpClient.get(`${UserConfig.paintingByAPI}/${param}/${value}`);
  }

  getMostViewedPainting(): Observable<MostViewedPaintingResponse> {
    return this.httpClient.get(UserConfig.mostViewedAPI);
  }

  getFeaturedPaintings(): Observable<PaintingListResponse> {
    return this.httpClient.get(UserConfig.featuredImages);
  }
}
