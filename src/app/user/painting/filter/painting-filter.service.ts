import {Injectable} from '@angular/core';
import {PaintingListItem} from '../entity/painting-list-item';

@Injectable({
  providedIn: 'root'
})
export class PaintingFilterService {

  constructor() {
  }

  public processArtistNameFilter(rowList: PaintingListItem[], artistName: string): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.artist.includes(artistName)) {
        resultList.push(painting);
      }
    }
    return resultList;
  }

  public processColorFilter(rowList: PaintingListItem[], color: string): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.colorsType === color) {
        resultList.push(painting);
      }
    }
    return resultList;
  }

  public processArtTypeFilter(rowList: PaintingListItem[], artType: string): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.artType === artType) {
        resultList.push(painting);
      }
    }
    console.log(resultList);
    return resultList;
  }
}
