import {Component, OnInit} from '@angular/core';
import {Painting} from '../../../../entity/painting/painting';
import {NetworkConnectorService} from '../../../../service/NetworkConnectorService/network-connector.service';
import {ActivatedRoute} from '@angular/router';
import {PaintingDetailsService} from '../../../service/painting-details/painting-details.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  private mPainting: Painting;

  constructor(private paintingService: PaintingDetailsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.paintingService.requestPaintingDetails(
      this.activatedRoute.snapshot.paramMap.get('id')
    ).subscribe(
      data => {
        this.mPainting = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }


}
