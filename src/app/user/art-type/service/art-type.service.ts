import {Injectable} from '@angular/core';
import {ArtTypeManagerService} from '../manager/art-type-manager.service';
import {Observable, Subject} from 'rxjs';
import {ArtTypeListItem} from '../entity/art-type-list-item';
import {ArtTypeDetails} from '../entity/art-type-details';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeService {

  constructor(private artTypeManager: ArtTypeManagerService) {
  }

  getArtTypeList(): Observable<ArtTypeListItem[]> {
    const artTypeSubject = new Subject<ArtTypeListItem[]>();
    this.artTypeManager.getArtTypeList().subscribe(
      artTypeListResponse => {
        artTypeSubject.next(artTypeListResponse.Data);
      }
    );
    return artTypeSubject.asObservable();
  }

  getArtType(id: number): Observable<ArtTypeDetails> {
    const artTypeSubject = new Subject<ArtTypeDetails>();
    this.artTypeManager.getArtType(id).subscribe(
      artTypeDetailsResponse => {
        artTypeSubject.next(artTypeDetailsResponse.Data);
      }
    );
    return artTypeSubject.asObservable();
  }
}
