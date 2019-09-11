import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';

@Component({
  selector: 'app-art-type-page',
  templateUrl: './art-type-page.component.html',
  styleUrls: ['./art-type-page.component.scss']
})
export class ArtTypePageComponent implements OnInit {
  artType: ArtTypeDetails = null;

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
        this.artType = data.Data;
      }
    );
  }

}
