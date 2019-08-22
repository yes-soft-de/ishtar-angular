import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../../service/artist/artist.service';
import {Artist} from '../../../../entity/artist/artist';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {
  public artists: Artist;

  constructor(private artist: ArtistService) { }

  ngOnInit() {
  }

}
