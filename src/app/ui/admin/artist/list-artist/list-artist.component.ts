import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../../service/artist/artist.service';
import {ArtistInterface} from '../../../../entity/artist/artist-interface';
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
    // Fetch All Artists
    this.artist.getAllArtists().subscribe(
      (data: ArtistInterface) => {
        this.artists = data;
        console.log(this.artists);
      }, error1 => {
        console.log(error1);
      });

  }

}
