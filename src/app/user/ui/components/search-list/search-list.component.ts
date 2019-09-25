import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PaintingSearchListItem} from '../../../entity/search-result/painting-search-list-item';
import {ArtistSearchListItem} from '../../../entity/search-result/artist-search-list-item';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  @Input() paintingList: PaintingSearchListItem[] = [];
  @Input() artistList: ArtistSearchListItem[] = [];

  paintingListFormatted: PaintingListItem[] = [];
  artistListFormatted: ArtistListItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.prepareArtistList();
    this.preparePaintingList();
    console.log(`Artist List Length is ${this.artistList.length}`);
    console.log(`Painting List Length is ${this.paintingList.length}`);
  }

  prepareArtistList() {
    for (const i of this.artistList) {
      const artistItem: ArtistListItem = {
        Facebook: '', Instagram: '', Linkedin: '', Twitter: '', artType: '', birthDate: '',
        details: '', nationality: '', residence: '', story: '', video: '',
        id: i.id,
        name: i.name,
        path: i.path
      };
      this.artistListFormatted.push(artistItem);
    }
  }

  preparePaintingList() {
    for (const i of this.paintingList) {
      const paintingItem: PaintingListItem = {
        artType: '', colorsType: '', height: '', state: false, story: '', width: '',
        artist: i.artist,
        id: i.id,
        image: i.path,
        name: i.name
      };
      this.paintingListFormatted.push(paintingItem);
    }
  }
}
