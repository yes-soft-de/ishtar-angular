import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SearchService} from '../../../service/search/search.service';
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

  navigationSubscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private searchService: SearchService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.fetchData();
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
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
              path: i.image,
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
