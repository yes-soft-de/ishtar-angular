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
    artist.name = form.value.name;
    artist.nationality = form.value.nationality;
    artist.residence = form.value.residence;
    artist.birthDate = form.value.birthDate;
    artist.facebook = form.value.facebook;
    artist.instagram = form.value.instagram;
    artist.linkedin = form.value.linkedin;
    artist.twitter = form.value.twitter;
    artist.image = form.value.image;
    artist.video = form.value.video;
    artist.details = form.value.details;
    artist.story = form.value.story;
    console.log(artist);
    this.artist.postAddArtist(artist);
    // TODO insert ngx-toastr Message
  }

}
