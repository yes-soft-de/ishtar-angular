import {Component, OnInit} from '@angular/core';
import {Featured} from '../../../../admin/entity/featured/featured';
import {NetworkConnectorService} from '../../../../admin/service/NetworkConnectorService/network-connector.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgwWowService} from 'ngx-wow';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }

}
