import {Component, Input, OnInit} from '@angular/core';
import {Painting} from '../../../../admin/entity/painting/painting';
import {PaintingListItem} from '../../entity/painting-list-item';

@Component({
  selector: 'app-featured-images',
  templateUrl: './featured-images.component.html',
  styleUrls: ['./featured-images.component.scss']
})
export class FeaturedImagesComponent implements OnInit {
  public painingList: PaintingListItem[];
  constructor() { }

  ngOnInit() {
  }

}
