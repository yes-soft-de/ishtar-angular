import {Component, Input, OnInit} from '@angular/core';
import {Painting} from '../../../../admin/entity/painting/painting';
import {PaintingListItem} from '../../entity/painting-list-item';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  @Input() painting: PaintingListItem;
  constructor() { }

  ngOnInit() {
  }

}
