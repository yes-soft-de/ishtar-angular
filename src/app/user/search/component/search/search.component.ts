import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PaintingSearchListItem} from '../../../entity/search-result/painting-search-list-item';
import {ArtistSearchListItem} from '../../../entity/search-result/artist-search-list-item';
import {ActivatedRoute} from '@angular/router';
import {SearchHelpersService} from '../../helper/search-helpers.service';
import {SearchListItem} from '../../entity/search-list-item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  paintingList: SearchListItem[] = [];
  artistList: SearchListItem[] = [];

  constructor(private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private searchHelper: SearchHelpersService) {
  }

  ngOnInit() {
    const searchParams = this.activatedRoute.snapshot.paramMap.get('query').replace('%20', ' ');
    this.searchService.search(searchParams).subscribe(
      result => {
        this.artistList = this.searchHelper.getArtistList(result);
        this.paintingList = this.searchHelper.getPaintingList(result);
      }
    );
  }
}
