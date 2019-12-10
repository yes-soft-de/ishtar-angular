import {Component, Input, OnInit} from '@angular/core';
import {SearchListItem} from '../../entity/search-list-item';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent implements OnInit {
  @Input() artistList: SearchListItem[];
  config;

  constructor() {
  }

  ngOnInit() {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.artistList.length
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
