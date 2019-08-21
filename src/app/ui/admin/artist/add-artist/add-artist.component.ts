import { Component, OnInit } from '@angular/core';
import {NetworkConnectorService} from '../../../../service/NetworkConnectorService/network-connector.service';
import {ArtistAdmin} from '../../../../entity/admin/artist/artist-admin';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

  constructor(private networkClient: NetworkConnectorService) { }

  ngOnInit() {
  }

  mySubmit(form) {
    const artist: ArtistAdmin = new ArtistAdmin();
    artist.name = form.value.name;
    artist.username = form.value.username;
    artist.email = form.value.email;
    artist.address = form.value.address;
    this.networkClient.postAddArtist(artist);
    // TODO insert success message
  }

}
