import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-alternating-list',
  templateUrl: './alternating-list.component.html',
  styleUrls: ['./alternating-list.component.scss']
})
export class AlternatingListComponent implements OnInit {
  list = [];

  constructor() {
  }

  ngOnInit() {
    const item = {
      imgUrl: 'https://cdn.pixabay.com/photo/2017/12/01/08/02/paint-2990357__340.jpg',
      title: 'Buying the pieces you wish',
      text: 'Buying the pieces you wish Buying the pieces you wish Buying the pieces you wish'
    };
    this.list.push(item, item, item);
  }
}
