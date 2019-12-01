import {Injectable} from '@angular/core';
import {SearchListItem} from '../entity/search-list-item';
import {ArtistListItem} from '../../artist/entity/artist-list-item';

@Injectable({
  providedIn: 'root'
})
export class SearchHelpersService {

  constructor() {
  }

  getArtistList(searchList: SearchListItem[]): SearchListItem[] {
    const artistList: SearchListItem[] = [];
    for (const i of searchList) {
      if (i.artist !== null && i.artist !== undefined) {
        artistList.push(i);
      }
    }
    return artistList;
  }

  getPaintingList(searchList: SearchListItem[]): SearchListItem[] {
    const paintingList: SearchListItem[] = [];
    for (const i of searchList) {
      if (!(i.artist !== null && i.artist !== undefined)) {
        paintingList.push(i);
      }
    }
    return paintingList;
  }
}
