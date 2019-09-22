import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PaintingSearchList} from '../../../entity/search-result/painting-search-list';
import {ArtistSearchList} from '../../../entity/search-result/artist-search-list';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() paintingList: PaintingSearchList[] = [];
  @Input() artistList: ArtistSearchList[] = [];
  constructor() { }

  ngOnInit() {
  }
}
