import {Injectable} from '@angular/core';
import {PaintingRepositoryService} from '../repository/painting-repository.service';
import {Observable} from 'rxjs';
import {PaintingDetailsResponse} from '../response/painting-details-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingManagerService {

  constructor(private paintingRepository: PaintingRepositoryService) {
  }

  getPainting(paintingId: number): Observable<PaintingDetailsResponse> {
    return this.paintingRepository.getPainting(paintingId);
  }
}
