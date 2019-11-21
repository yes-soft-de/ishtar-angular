import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaintingDetailsResponse } from '../response/painting-details-response';
import { EMPTY, Subject, Observable } from 'rxjs';
import { PaintingDetails } from '../../entity/painting-details/painting-details';
import {UserConfig} from '../../UserConfig';
import {PaintingListResponse} from '../response/painting-list-response';

@Injectable({
  providedIn: 'root'
})
/**
 * PaintingRepository Class Is To Connect To Http Request
 */
export class PaintingRepositoryService {

  constructor(private httpClient: HttpClient) { }

  // Fetch All Paintings
  getPaintings(): Observable<PaintingListResponse> {
    return this.httpClient.get<PaintingListResponse>(UserConfig.paintingsAPI);
  }

  // Fetch Painting Detail
  getPainting(paintingId: number): Observable<PaintingDetailsResponse> {
    return this.httpClient.get<PaintingDetailsResponse>(`${UserConfig.paintingAPI}/${paintingId}`);
  }

  // Fetch Every Thing From Painting Table
  getPaintingListBy(param: string, value: number): Observable<any> {
    return this.httpClient.get(`${UserConfig.paintingByAPI}/${param}/${value}`);
  }

}
