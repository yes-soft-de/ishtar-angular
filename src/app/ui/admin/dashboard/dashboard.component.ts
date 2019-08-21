import { Component, OnInit } from '@angular/core';
import { NetworkConnectorService} from '../../../service/NetworkConnectorService/network-connector.service';
import {ArtistAdminInterface} from '../../../entity/admin/artist/artist-admin-interface';
import {ArtistAdmin} from '../../../entity/admin/artist/artist-admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  artists: ArtistAdmin;
  constructor(private networkClient: NetworkConnectorService) { }

  ngOnInit() {
    // Fetch All Artists Number
    this.networkClient.requestListAdminArtists().subscribe(
      (data: ArtistAdminInterface) => {
        this.artists = data;
      }, error1 => {
        console.log(error1);
      })
  }

}
