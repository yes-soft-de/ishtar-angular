import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtTypeDetailsResponse} from '../../entity/art-type-details/art-type-details-response';

@Injectable({
  providedIn: 'root'
})
export class UserArtTypeService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  requestArtTypeDetails(artTypeId: string) {
    const request: {
      artType: string
    } = {
      artType: artTypeId
    };
    return this.httpClient.post<ArtTypeDetailsResponse>(UserConfig.ArtTypeAPI, JSON.stringify(request));
  }
}
