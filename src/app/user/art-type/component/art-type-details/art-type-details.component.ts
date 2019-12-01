import {Component, OnInit} from '@angular/core';
import {ArtTypeService} from '../../service/art-type.service';
import {ActivatedRoute} from '@angular/router';
import {ArtTypeDetails} from '../../entity/art-type-details';

@Component({
  selector: 'app-art-type-details',
  templateUrl: './art-type-details.component.html',
  styleUrls: ['./art-type-details.component.scss']
})
export class ArtTypeDetailsComponent implements OnInit {
  artType: ArtTypeDetails;

  constructor(private artTypeService: ArtTypeService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.artTypeService.getArtType(+urlSegments[1].path).subscribe(
          artTypeDetails => {
            this.artType = artTypeDetails;
          }
        );
      }
    );
  }

}
