import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';

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
    // Request Art Type Info
    this.artTypeService.requestArtTypeDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.artTypeService.getAllArtTypeWithDetails().subscribe(
          response => {
            for (const i of response.Data) {
              if (i.name === data.Data.name) {
                this.artType = i;
                console.log(i.history);
              }
            }
          }
        );
      }
    );
  }

}
