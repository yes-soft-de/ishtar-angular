import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ArtTypeListResponse} from '../response/art-type-list-response';
import {ArtTypeRepositoryService} from '../repository/art-type-repository.service';
import {ArtTypeDetailsResponse} from '../response/art-type-details-response';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeManagerService {

  constructor(private artTypeRepository: ArtTypeRepositoryService) {
  }

  getArtTypeList(): Observable<ArtTypeListResponse> {
    return this.artTypeRepository.getArtTypeList();
  }

  getArtType(id: number): Observable<ArtTypeDetailsResponse> {
    return this.artTypeRepository.getArtType(id);
  }
}
