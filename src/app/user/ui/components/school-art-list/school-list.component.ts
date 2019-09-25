import {Component, Input, OnInit} from '@angular/core';
import {ArtTypeListItem} from '../../../entity/art-type-list/art-type-list-item';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  public schools = [];
  @Input() artTypeList: ArtTypeListItem[];

  constructor() {
  }

  ngOnInit() {
    let school = {
      name: 'Cubism',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_' +
        '-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Abstract',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_' +
        '-_Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Realist',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_' +
        'Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    school = {
      name: 'Cubism',
      img: 'http://cdn.shopify.com/s/files/1/0969/9128/products/Indian_Art_-_' +
        'Acrylic_Painting_-_Krishna_With_Peacock_grande.jpg?v=1476088975'
    };
    this.schools.push(school);
    this.schools.push(school);
    this.schools.push(school);
  }

}
