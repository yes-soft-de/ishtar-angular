import {Component, OnInit} from '@angular/core';
import {Featured} from '../../../entity/featured/featured';
import {NetworkConnectorService} from '../../../service/NetworkConnectorService/network-connector.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  featured: Featured;

  constructor(private network: NetworkConnectorService) {
  }

  ngOnInit() {
    this.network.requestFeatured().subscribe(
      data => {
        this.featured = data;
      }, error1 => {
        console.log(error1);
      }
    );
  }

}
