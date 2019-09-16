import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArtTypeDetails} from '../../../entity/art-type-details/art-type-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  @Input() public paintings: any[] = [];
  @Input() artTypeList: ArtTypeDetails[];
  @ViewChild('carouselIndicators', {static: false}) indicatorsHtml: HTMLOListElement;

  constructor() {
  }

  ngOnInit() {
  }
}
