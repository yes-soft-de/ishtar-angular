import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingDetailsService} from '../../../service/painting-details/painting-details.service';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ToastrService} from 'ngx-toastr';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {UserArtTypeService} from '../../../service/art-type/user-art-type.service';

@Component({
  selector: 'app-painting',
  templateUrl: './painting-details-page.component.html',
  styleUrls: ['./painting-details-page.component.scss']
})
export class PaintingDetailsPageComponent implements OnInit {
  paintingDetails: PaintingDetails;

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private paintingDetailsService: PaintingDetailsService,
              private artTypeService: UserArtTypeService) {
  }

  ngOnInit() {
    this.paintingDetailsService.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.paintingDetails = data.Data[0];
      }
    );


  }
}
