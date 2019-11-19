import {Injectable} from '@angular/core';
import {PaintingRepositoryService} from '../repository/painting-repository.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingManagerService {

  constructor(private paintingRepository: PaintingRepositoryService) {
  }

  getPainting(paintingId: number) {
    this.paintingRepository.getPainting(paintingId);
  }
}
