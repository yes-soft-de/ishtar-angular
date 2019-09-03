import {Component, OnInit} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  public artistList: {
    image: string,
    artist: string,
    paintingNumber: number,
    artistFollowers: number
  }[];

  constructor() {
  }

  ngOnInit() {
    this.artistList = [];
    const item = {
      image: 'some.url',
      artist: 'Mohammad',
      paintingNumber: 204,
      artistFollowers: 22
    };
    this.artistList.push(item);
    this.artistList.push(item);
    this.artistList.push(item);
    this.artistList.push(item);
    this.artistList.push(item);
    this.artistList.push(item);
    this.artistList.push(item);
  }

}
