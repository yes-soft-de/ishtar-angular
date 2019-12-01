import {Component, Input, OnInit} from '@angular/core';
import {SearchListItem} from '../../entity/search-list-item';

@Component({
  selector: 'app-painting-search',
  templateUrl: './painting-search.component.html',
  styleUrls: ['./painting-search.component.scss']
})
export class PaintingSearchComponent implements OnInit {
  @Input() paintingList: SearchListItem[];
  config: any;

  constructor() {
  }

  ngOnInit() {
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
