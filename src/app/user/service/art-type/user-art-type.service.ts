import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtTypeDetailsResponse} from '../../entity/art-type-details/art-type-details-response';
import {catchError} from 'rxjs/operators';
import {ArtTypeListResponse} from '../../entity/art-type-list/art-type-list-response';
import {ArtTypeResponse} from '../../../admin/entity/art-type/art-type-response';
import {AdminConfig} from '../../../admin/AdminConfig';

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

  requestArtTypeDetails(artTypeId: string) {
    return this.httpClient.get(`${UserConfig.artTypeAPI}/${artTypeId}`);
  }

  getAllArtTypeWithDetails() {
    return this.httpClient.get<ArtTypeListResponse>(
      `${UserConfig.allArtTypeAPI}`, {responseType: 'json'}
    );
  }
}
