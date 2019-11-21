import {Component, OnInit} from '@angular/core';
import {ArtistObject} from '../../../entity-protected/artist/artist-object';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  artistMainPainting;
  artist: ArtistObject;

  constructor() {
  }

  ngOnInit() {
  }

}
