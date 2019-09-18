import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtTypeDetailsResponse} from '../../entity/art-type-details/art-type-details-response';
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
    return this.httpClient.get<ArtTypeListResponse>(
      `${UserConfig.allArtTypeAPI}`, {responseType: 'json'}
      );
  }

  requestArtTypeDetails(artTypeId: string) {
    const request: {
      artType: string
    } = {
      artType: artTypeId
    };
    return this.httpClient.post<ArtTypeDetailsResponse>(UserConfig.ArtTypeAPI, JSON.stringify(request));
  }

  getAllArtTypeWithDetails() {
    return this.httpClient.get<ArtTypeListResponse>(
      `${UserConfig.allArtTypeAPI}`, {responseType: 'json'}
    );
  }
}
