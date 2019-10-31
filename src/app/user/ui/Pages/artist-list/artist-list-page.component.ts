import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-artist-list-page',
  templateUrl: './artist-list-page.component.html',
  styleUrls: ['./artist-list-page.component.scss']
})
export class ArtistListPageComponent implements OnInit, OnDestroy {
  artistList: ArtistListItem[];
  artistListObservable: Subscription;

  constructor(private artistService: ArtistListService) { }

  ngOnInit() {
    this.requestArtistList();
  }

  ngOnDestroy() {
    // stop observable after navigate to another route to prevent it from consumption the memory
    this.artistListObservable.unsubscribe();
  }

  requestArtistList() {
    this.artistListObservable = this.artistService.requestArtistList().subscribe(
        (data: any) => {
          this.artistList = data.Data;
        }, error1 => {
        console.log(error1);
      });
  }

}
