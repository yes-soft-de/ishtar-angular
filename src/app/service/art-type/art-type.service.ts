import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Config} from '../../config/config';
import {ArtTypeInterface} from '../../entity/art-type/art-type-interface';


@Injectable({
providedIn: 'root'
})
export class ArtTypeService {

constructor(private router: Router,
            private route: ActivatedRoute,
            private httpClient: HttpClient) { }


  // Add New Art Type Using Http POST Request
  // postAddArtType(artType: ArtTypeInterface) {
  //   return this.httpClient.post<ArtTypeInterface>(
  //     `${Config.addArtTypeAPI}`, JSON.stringify(artType)
  //   ).subscribe(
  //     data => {
  //       // TODO insert ngx-toastr Message
  //       console.log('POST Request Was Successfully done', data);
  //       // this.router.navigate(['admin/list-ArtTypeInterface'], {relativeTo: this.route});
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       console.log('done');
  //       this.router.navigate(['admin/list-arttype'], {relativeTo: this.route});
  //     }
  //   );
  // }
}
