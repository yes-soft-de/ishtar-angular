import {Component, OnInit} from '@angular/core';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';

@Component({
  selector: 'app-c-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  private paintingList;

  constructor(private paintingService: PaintingListService) {
  }

  ngOnInit() {
    // TODO: Add Painting List Details Here
  }
}
