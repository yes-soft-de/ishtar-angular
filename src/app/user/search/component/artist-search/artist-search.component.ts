import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../painting/entity/painting-list-item';
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
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
