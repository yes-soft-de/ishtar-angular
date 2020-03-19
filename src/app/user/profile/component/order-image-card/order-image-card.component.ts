import {Component, Input, OnInit} from '@angular/core';
import {PaintingService} from '../../../painting/service/painting.service';
import {PaintingDetails} from '../../../painting/entity/painting-details';

@Component({
  selector: 'app-order-image-card',
  templateUrl: './order-image-card.component.html',
  styleUrls: ['./order-image-card.component.scss']
})
export class OrderImageCardComponent implements OnInit {
  @Input() orderItem: { rowId: number };
  paintingData: PaintingDetails;

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit() {
    console.log('Requesting Painting Id: ' + this.orderItem.rowId);
    this.paintingService.getPainting(this.orderItem.rowId).subscribe(
      paintingData => {
        this.paintingData = paintingData;
      }
    );
  }
}
