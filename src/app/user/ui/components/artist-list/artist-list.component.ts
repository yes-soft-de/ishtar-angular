import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  @Input() artistListFormatted: ArtistListItem[];
  public artistList: {
    id: number,
    image: string,
    name: string,
    paintingNumber: number,
    artistFollowers: number
  }[];

  public types: string[] = [];

  public activeArtType: string;

  constructor() {
  }

  ngOnInit() {
    for (const i of this.artistListFormatted) {
      this.types.push(i.artType);
    }
    this.types = [...new Set(this.types)];
    this.artistList = [];
    for (const i of this.artistListFormatted) {
      this.artistList.push({
        id: i.id,
        image: i.path,
        name: i.name,
        paintingNumber: 4,
        artistFollowers: 10
      });
    }
  }

  filterByArtType(name: string) {
    this.activeArtType = name;
    this.artistList = [];
    for (const i of this.artistListFormatted) {
      if (i.artType === name) {
        this.artistList.push({
          image: i.path,
          name: i.name,
          paintingNumber: 4,
          artistFollowers: 10,
          id: i.id
        });
      }
    }
  }
}
