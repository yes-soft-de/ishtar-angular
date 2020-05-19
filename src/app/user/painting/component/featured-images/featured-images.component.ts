import {Component, OnInit} from '@angular/core';
import {PaintingListItem} from '../../entity/painting-list-item';
import {PaintingService} from '../../service/painting.service';

@Component({
  selector: 'app-featured-images',
  templateUrl: './featured-images.component.html',
  styleUrls: ['./featured-images.component.scss']
})
export class FeaturedImagesComponent implements OnInit {
  public painingList: PaintingListItem[];

  constructor(private paintingService: PaintingService) {
  }

  ngOnInit() {
    this.paintingService.getFeaturedPaintings().subscribe(
      result => {
        this.painingList = result.length > 8 ? result.slice(0, 8) : result;
      }
    );
  }

}
