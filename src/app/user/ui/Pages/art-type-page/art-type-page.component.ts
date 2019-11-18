import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-art-type-page',
  templateUrl: './art-type-page.component.html',
  styleUrls: ['./art-type-page.component.scss']
})
export class ArtTypePageComponent implements OnInit {
  artType: ArtTypeListItem = null;

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private artTypeService: UserArtTypeService) {
  }

  ngOnInit() {
    // TODO Explain This
    // region Code Id Don't Know Why Exists!
    // Get Art Type Detail
    const getArtTypeDetailObs: Observable<any> = this.artTypeService.requestArtTypeDetails(this.activatedRoute.snapshot.paramMap.get('id'));
    // Get All Art Type
    const getAllArtTypeObs: Observable<any> = this.artTypeService.getAllArtType();
    // Join The Two Observable To Make One Subscribe for the Both
    const combinedObs = forkJoin(getArtTypeDetailObs, getAllArtTypeObs);
    combinedObs.subscribe((data: any) => {
      // Loop Inside the Second Result(getAllArtTypeObs Result) and Equal it With First To Get Specified ArtType To Get The 'path' Property
      data[1].Data.map(res => {
        if (res.name === data[0].Data['0'].name) {
          this.artType = res;
          console.log(this.artType.path);
        }
      });
    });
    // endregion
  }

}
