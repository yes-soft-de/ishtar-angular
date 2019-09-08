import {Component, Input, OnInit} from '@angular/core';
import {PaintingDetails} from '../../../entity/painting-details/painting-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {
  @Input() painting: PaintingDetails;
  featuredList: PaintingListItem[];

  constructor(private paintingService: PaintingListService) {
  }

  ngOnInit() {
    this.paintingService.requestPaintingList().subscribe(
      data => {
        this.featuredList = data.Data;
      }
    );
  }


}
