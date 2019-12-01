import { Component, OnInit } from '@angular/core';
import {PaintingService} from '../../service/painting.service';
import {ActivatedRoute} from '@angular/router';
import {PaintingListItem} from '../../entity/painting-list-item';

@Component({
  selector: 'app-paintings-may-like',
  templateUrl: './painting-may-like.component.html',
  styleUrls: ['./painting-may-like.component.scss']
})
export class PaintingMayLikeComponent implements OnInit {
  paintingList: PaintingListItem[];
  constructor(private paintingService: PaintingService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
    urlSegments => {
      this.paintingService.getPaintings()
          .subscribe(
          data => {
            this.paintingList = data.slice(0, 8);
            console.log('painting list', this.paintingList);
          }
      );
    });
  }

  viewImage(paintingId: number) {
    return;
  }

}
