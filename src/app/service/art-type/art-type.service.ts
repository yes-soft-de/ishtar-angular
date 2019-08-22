import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../config/config';
import {ArtType} from '../../entity/art-type/art-type';


@Injectable({
  providedIn: 'root'
})
export class ArtTypeService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) { }


  // Add New Art Type Using Http POST Request
  postAddArtType(artType: ArtType) {
    return this.httpClient.post<ArtType>(
      `${Config.addArtTypeAPI}`, JSON.stringify(artType)
    ).subscribe(
      data => {
        // TODO insert ngx-toastr Message
        console.log('POST Request Was Successfully done', data);
        // this.router.navigate(['admin/list-arttype'], {relativeTo: this.route});
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('done');
        this.router.navigate(['admin/list-arttype'], {relativeTo: this.route});
      }
    )
  }
}
