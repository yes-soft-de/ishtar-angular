import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../../service/artist/artist.service';
import {Artist} from '../../../../entity/artist/artist';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  constructor(private artist: ArtistService) { }

  ngOnInit() {
  }

  mySubmit(form) {
    const artist: Artist = new Artist();
    // TODO inserting new real data
    // artist.name = form.value.name;
    // artist.username = form.value.username;
    // artist.email = form.value.email;
    // artist.address = form.value.address;
    this.artist.postAddArtist(artist);
    // TODO insert success message
  }

}
