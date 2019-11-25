import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtTypeListResponse} from '../../entity/art-type-list/art-type-list-response';

@Injectable({
  providedIn: 'root'
})
export class UserArtTypeService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  // Get All Art Type
  getAllArtType() {
    return this.httpClient.get<ArtTypeListResponse>(`${UserConfig.artTypesAPI}`);
  }
  // getAllArtType() {
  //   return this.httpClient.get<ArtTypeListResponse>(
  //     `${UserConfig.allArtTypeAPI}`, {responseType: 'json'}
  //   );
  // }

  // Get Art Type Details
  requestArtTypeDetails(artTypeId: string) {
    return this.httpClient.get(`${UserConfig.artTypeAPI}/${artTypeId}`);
  }
  // requestArtTypeDetails(artTypeId: string) {
  //   const request: {
  //     artType: string
  //   } = {
  //     artType: artTypeId
  //   };
  //   return this.httpClient.post<ArtTypeDetailsResponse>(UserConfig.ArtTypeAPI, JSON.stringify(request));
  // }
}
