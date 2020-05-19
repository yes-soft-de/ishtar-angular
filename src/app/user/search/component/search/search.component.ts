import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
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
    this.activatedRoute.queryParamMap.subscribe(
      (param: ParamMap) => {
        const searchParams = param.get('q');
        this.searchService.search(searchParams).subscribe(
          result => {
            this.artistList = this.searchHelper.getArtistList(result);
            this.paintingList = this.searchHelper.getPaintingList(result);
          }
        );
      });
  }
}
