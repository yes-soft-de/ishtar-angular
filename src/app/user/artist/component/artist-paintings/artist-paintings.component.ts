import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaintingService} from '../../../painting/service/painting.service';
import {PaintingListItem} from '../../../painting/entity/painting-list-item';

@Component({
  selector: 'app-artist-paintings',
  templateUrl: './artist-paintings.component.html',
  styleUrls: ['./artist-paintings.component.scss']
})
export class ArtistPaintingsComponent implements OnInit {
  @Output() randomArtistPainting = new EventEmitter<PaintingListItem>();
  paintingList: PaintingListItem[];
  paintingSlidesPage: any = [[]];             // For Storing Paintings and separate it to 4 pieces
  artistRandomPainting: any;

  constructor(private activatedRoute: ActivatedRoute,
              private paintingService: PaintingService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.paintingService.getPaintingListBy('artist', Number(urlSegments[1].path)).subscribe(
        data => {
          this.paintingList = data;
          this.paintingSlidesPage = this.chunk(this.paintingList, 4);
          const random = `${Math.random() * 100}`;
          const randPainting = parseInt(random, 10) % this.paintingList.length;
          this.artistRandomPainting = this.paintingList[randPainting];
          // Send Data To Parent Component
          this.randomArtistPainting.emit(this.artistRandomPainting);
        });
      }
    );
  }

  // create chunk of paintings array to use it in painting carousel
  chunk(paintingsArr, chunkSize) {
    const arr = [];
    for (let i = 0, len = paintingsArr.length; i < len; i += chunkSize) {
      arr.push(paintingsArr.slice(i, i + chunkSize));
    }
    return arr;
  }
}
