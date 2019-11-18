import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistManagerService} from '../../../manager/artist/artist-manager.service';
import {ArtistObject} from '../../../entity-protected/artist/artist-object';

@Component({
  selector: 'app-artist-list-page',
  templateUrl: './artist-list-page.component.html',
  styleUrls: ['./artist-list-page.component.scss']
})
export class ArtistListPageComponent implements OnInit, OnDestroy {
  artistList: ArtistObject[];

  constructor(private artistService: ArtistManagerService) {
  }

  ngOnInit() {
    this.requestArtistList();
  }

  ngOnDestroy() {
  }

  requestArtistList() {
    this.artistService.getListObservable().subscribe(
      data => {
        this.artistList = data;
      }
    );
    this.artistService.getAllArtists();
  }
}
