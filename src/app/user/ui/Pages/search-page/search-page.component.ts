import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../../service/search.service';
import {PaintingSearchListItem} from '../../../entity/search-result/painting-search-list-item';
import {ArtistSearchListItem} from '../../../entity/search-result/artist-search-list-item';

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

  paintingList: PaintingSearchListItem[] = [];
  artistList: ArtistSearchListItem[] = [];

  loaded = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private searchService: SearchService) {
  }

  ngOnInit() {
    const searchParams = this.activatedRoute.snapshot.paramMap.get('query');
    this.queryFormatted = searchParams.replace('%20', ' ');
    this.searchService.requestSearchResult(this.queryFormatted).subscribe(
      data => {
        for (const i of data.Data) {
          // Add to Painting if No Artist Exists
          if (i.artist == null) {
            const artistItem: ArtistSearchListItem = {
              name: i.name,
              path: i.path,
              id: parseInt(i.id, 10)
            };
            this.artistList.push(artistItem);
          } else {
            const paintingItem: PaintingSearchListItem = {
              name: i.name,
              path: i.path,
              id: parseInt(i.id, 10),
              artist: i.artist
            };
            this.paintingList.push(paintingItem);
          }
        }
        this.loaded = true;
      }
    );
  }

  submitSearch() {
    this.router.navigate(['/search/' + this.searchFrom.get('search').value]);
  }

}
