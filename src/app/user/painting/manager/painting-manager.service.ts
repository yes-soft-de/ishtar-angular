import {Injectable} from '@angular/core';
import {PaintingRepositoryService} from '../repository/painting-repository.service';
import {Observable} from 'rxjs';
import {PaintingDetailsResponse} from '../response/painting-details-response';
import {PaintingListResponse} from '../response/painting-list-response';
import {UserConfig} from '../../UserConfig';
import {MostViewedListItem} from '../entity/most-viewed-list-item';
import {MostViewedPaintingResponse} from '../response/most-viewed-painting-response';

@Injectable({
  providedIn: 'root'
})
/**
 * PaintingManager Class Is Like a Bridge Between Repository And Service
 */
export class PaintingManagerService {

  constructor(private paintingRepository: PaintingRepositoryService) {
  }

  // Fetch All Paintings
  getPaintings(): Observable<PaintingListResponse> {
    return this.paintingRepository.getPaintings();
  }

  // Fetch Painting Details
  getPainting(paintingId: number): Observable<PaintingDetailsResponse> {
    return this.paintingRepository.getPainting(paintingId);
  }

  // Fetch Every Thing From Painting Table
  getPaintingListBy(param: string, value: number): Observable<any> {
    return this.paintingRepository.getPaintingListBy(param, value);
  }

  getMostViewedPainting(): Observable<MostViewedPaintingResponse> {
    return this.paintingRepository.getMostViewedPainting();
  }

  getFeaturedPaintings(): Observable<PaintingListResponse> {
    return this.paintingRepository.getFeaturedPaintings();
  }
}
