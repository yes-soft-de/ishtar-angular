import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaintingDetailsService} from '../../../service/painting-details/painting-details.service';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {ToastrService} from 'ngx-toastr';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';

@Component({
  selector: 'app-painting',
  templateUrl: './painting-details-page.component.html',
  styleUrls: ['./painting-details-page.component.scss']
})
export class PaintingDetailsPageComponent implements OnInit {
  paintingDetails: PaintingDetails = null;

  constructor(private toaster: ToastrService,
              private activatedRoute: ActivatedRoute,
              private paintingDetailsService: PaintingDetailsService) {
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
    // region Make Sure the Data arrived
    this.paintingDetailsService.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.paintingDetails = data;
        console.log(JSON.stringify(data));
      }, error1 => {
        console.log(error1);
      }
    );
  }
}
