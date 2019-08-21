import { Component, OnInit } from '@angular/core';
import {NetworkConnectorService} from '../../../../service/NetworkConnectorService/network-connector.service';
import { ArtistAdminInterface } from '../../../../entity/admin/artist/artist-admin-interface';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.scss']
})
export class ListArtistComponent implements OnInit {


  constructor(private networkClient: NetworkConnectorService) { }

  ngOnInit() {
    
    this.networkClient.requestListAdminArtists().subscribe(
      data => {
        console.log(data);
    }, error1 => {
      console.log(error1);
    });

  }

}
