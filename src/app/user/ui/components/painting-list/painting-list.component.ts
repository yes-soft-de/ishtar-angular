import {Component, Input, OnInit} from '@angular/core';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {PaintingListAdapter} from '../../../bussiness-logic/painting-list-adapter/painting-list-adapter';
import {ImageListService} from '../../../service/images-list/image-list.service';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';

@Component({
  selector: 'app-c-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  @Input() formattedPaintingList: PaintingListItem[];

  constructor() {
  }

  ngOnInit() {
  }
}
