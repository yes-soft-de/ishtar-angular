import {Component, OnInit} from '@angular/core';
import {Featured} from '../../../entity/featured/featured';
import {NetworkConnectorService} from '../../../service/NetworkConnectorService/network-connector.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgwWowService} from 'ngx-wow';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public paintings = [];
  public schools = [];

  constructor() {
    const painting = {
      url: 'https://s3-ap-southeast-2.amazonaws.com/ish-oncourse-scc/b5cd4cfb-c5d9-4147-a72b-452d2f04bb73',
      head: 'History Of Syrian Art',
      description: 'History Of Syrian Art History Of Syrian Art History Of Syrian Art'
    };

    this.paintings.push(painting, painting, painting);

    let school = {
      name: 'Cubism',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Abstract',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Realist',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Cubism',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
  }

  ngOnInit() {

  }

}
