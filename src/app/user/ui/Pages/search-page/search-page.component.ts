import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../../service/search.service';
import {PaintingSearchList} from '../../../entity/search-result/painting-search-list';
import {ArtistSearchList} from '../../../entity/search-result/artist-search-list';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  queryFormatted: string;
  searchFrom = new FormGroup({
    search: new FormControl('')
  });

  paintingList: PaintingSearchList[] = [];
  artistList: ArtistSearchList[] = [];

  loaded = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private searchService: SearchService) {
  }

  ngOnInit() {
    const searchParams = this.activatedRoute.snapshot.paramMap.get('query');
    if (searchParams.length < 1) {
      alert('Null Search Query, Returning to Home Page');
      this.router.navigate(['/']);
    }
    this.queryFormatted = searchParams.replace('%20', ' ');
    this.searchService.requestSearchResult(this.queryFormatted).subscribe(
      data => {
        // If it has artist name, it's a painting
        if (JSON.stringify(data).includes('artist')) {
          this.paintingList = data.Data;
        } else {
          this.artistList = data.Data;
        }
        this.loaded = true;
      }
    );
  }

  submitSearch() {
    this.router.navigate(['/search/' + this.searchFrom.get('search').value]);
  }

}
