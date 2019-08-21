import { Component, OnInit } from '@angular/core';
import {NetworkConnectorService} from '../../../../service/NetworkConnectorService/network-connector.service';
import { ArtistAdminInterface } from '../../../../entity/admin/artist/artist-admin-interface';
import {ArtistAdmin} from '../../../../entity/admin/artist/artist-admin';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {
  public artists: ArtistAdmin;

  constructor(private networkClient: NetworkConnectorService) { }

  ngOnInit() {
    // Fetch All Artists
    this.networkClient.requestListAdminArtists().subscribe(
      (data: ArtistAdminInterface) => {
        this.artists = data;
    }, error1 => {
      console.log(error1);
    });

  }

}
