import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-painting-list-page',
  templateUrl: './painting-list-page.component.html',
  styleUrls: ['./painting-list-page.component.scss']
})
export class PaintingListPageComponent implements OnInit {

  constructor(private meta: Meta) { }

  ngOnInit() {
    this.meta.addTag({ name: 'title', content: 'Painting List | Ishtar-Art'});
    this.meta.addTag({ name: 'description', content: 'List of Available Paintings on Ishtar-Art'});
  }

}
