import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {Artist} from '../../../entity/artist/artist';
import {ArtistInterface} from '../../../entity/artist/artist-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  artists: Artist;
  constructor(private artist: ArtistService) { }

  ngOnInit() {
    // Fetch All Artists Number
    this.artist.getAllArtists().subscribe(
      (data: ArtistInterface) => {
        this.artists = data;
      }, error1 => {
        console.log(error1);
      })
  }

}
