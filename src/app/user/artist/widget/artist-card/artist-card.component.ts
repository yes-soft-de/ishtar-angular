import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../entity/artist-list-item';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: ArtistListItem;
  constructor() { }

  ngOnInit() {
  }

}
