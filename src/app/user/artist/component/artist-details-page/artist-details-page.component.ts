import { Component, OnInit } from '@angular/core';
import {PaintingListItem} from '../../../painting/entity/painting-list-item';

@Component({
  selector: 'app-artist-details-page',
  templateUrl: './artist-details-page.component.html',
  styleUrls: ['./artist-details-page.component.scss']
})
export class ArtistDetailsPageComponent implements OnInit {
  randomArtistPainting: PaintingListItem;

  constructor() { }

  ngOnInit() {
  }

  // Get Random Painting For This Artist From Child Component
  getRandomArtistPainting(event) {
    this.randomArtistPainting = event;
  }

}
