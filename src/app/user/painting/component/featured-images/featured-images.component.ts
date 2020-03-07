import {Component, Input, OnInit} from '@angular/core';
import {Painting} from '../../../../admin/entity/painting/painting';
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
        this.painingList = result;
      }
    );
  }

}
