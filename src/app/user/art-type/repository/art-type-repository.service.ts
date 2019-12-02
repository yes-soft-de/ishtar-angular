import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArtTypeListResponse} from '../response/art-type-list-response';
import {UserConfig} from '../../UserConfig';
import {ArtTypeDetailsResponse} from '../response/art-type-details-response';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  getArtTypeList(): Observable<ArtTypeListResponse> {
    return this.httpClient.get<ArtTypeListResponse>(UserConfig.artTypesAPI);
  }

  getArtType(id: number): Observable<ArtTypeDetailsResponse> {
    return this.httpClient.get<ArtTypeDetailsResponse>(`${UserConfig.artTypeAPI}/${id}`);
  }
}
