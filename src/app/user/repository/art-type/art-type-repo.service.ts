import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArtTypeListResponse} from '../../entity/art-type-list/art-type-list-response';
import {UserConfig} from '../../UserConfig';
import {Subject} from 'rxjs';
import {ArtTypeResponse} from '../../entity-protected/art-type/art-type-response';
import {ArtTypeObject} from '../../entity-protected/art-type/art-type-object';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeRepoService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllArtType(repoEventHandler: Subject<ArtTypeObject[]>) {
    this.httpClient.get<ArtTypeListResponse>(`${UserConfig.artTypesAPI}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Art Type List From Backend: ' + error1);
      }
    );
  }

  public getArtType(artTypeId: string, repoEventHandler: Subject<ArtTypeObject>) {
    return this.httpClient.get<ArtTypeResponse>(`${UserConfig.artTypeAPI}/${artTypeId}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Art Type List From Backend: ' + error1);
      }
    );
  }
}
