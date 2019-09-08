import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';

@Component({
  selector: 'app-c-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  public defaultImg = '../../../../../assets/1x/img-01.jpg';
  public artists: string[];
  public artTypes: string[];
  @Input() formattedPaintingList: PaintingListItem[];
  paintingList: PaintingListItem[];

  constructor() {
  }

  ngOnInit() {
    this.paintingList = this.formattedPaintingList;
    // region Artists Collecting
    this.artists = [];
    for (const image of this.formattedPaintingList) {
      this.artists.push(image.artist);
    }
    this.artists = [...new Set(this.artists)];
    // endregion
    // region Art Type Collecting
    this.artTypes = [];
    for (const image of this.formattedPaintingList) {
      this.artTypes.push(image.artType);
    }
    this.artTypes = [...new Set(this.artTypes)];
  }

  public filterByArtType(name: string) {
    const paintingList: PaintingListItem[] = [];
    for (const painting of this.formattedPaintingList) {
      painting.artType === name ? paintingList.push(painting) : console.log(painting.artType === name);
    }
    this.paintingList = paintingList;
  }

  public filterByArtist(name: string) {
    const paintingList: PaintingListItem[] = [];
    for (const painting of this.formattedPaintingList) {
      painting.artist === name ? paintingList.push(painting) : console.log(painting.artist === name);
    }
    this.paintingList = paintingList;
  }
}
