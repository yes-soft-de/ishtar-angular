import {Injectable} from '@angular/core';
import {PaintingListItem} from '../entity/painting-list-item';

@Injectable({
  providedIn: 'root'
})
export class PaintingFilterService {
  private readonly originalList: PaintingListItem[] = [];

  // region Filters Keywords, Java Style for Class Members Naming :)
  private mArtistNameFilter: string = null;
  private mArtTypeFilter: string = null;
  private mColorFilter: string = null;

  constructor(private rowList: PaintingListItem[]) {
    this.originalList = rowList;
  }

  public deactivateAllFilters(): PaintingListItem[] {
    this.mArtistNameFilter = null;
    this.mColorFilter = null;
    this.mArtTypeFilter = null;
    return this.getFilteredList();
  }

  public activateArtistNameFilter(artistName: string): PaintingListItem[] {
    this.mArtistNameFilter = artistName;
    return this.getFilteredList();
  }

  public deactivateArtistNameFilter(): PaintingListItem[] {
    this.mArtistNameFilter = null;
    return this.getFilteredList();
  }

  public activateColorFilter(colorName: string): PaintingListItem[] {
    this.mColorFilter = colorName;
    return this.getFilteredList();
  }

  public deactivateColorFilter() {
    this.mColorFilter = null;
    return this.getFilteredList();
  }

  public activateArtTypeNameFilter(artTypeName: string): PaintingListItem[] {
    this.mArtTypeFilter = artTypeName;
    return this.getFilteredList();
  }

  public deactivateArtTypeNameFilter(): PaintingListItem[] {
    this.mArtTypeFilter = null;
    return this.getFilteredList();
  }

  private getFilteredList(): PaintingListItem[] {
    let resultList = this.originalList;
    if (this.mArtistNameFilter !== null) {
      resultList = this.processArtistNameFilter(resultList);
    }
    if (this.mArtTypeFilter !== null) {
      resultList = this.processStyleFilter(resultList);
    }
    if (this.mColorFilter !== null) {
      resultList = this.processColorFilter(resultList);
    }
    return resultList;
  }

  private processArtistNameFilter(rowList: PaintingListItem[]): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.artist.includes(this.mArtistNameFilter)) {
        resultList.push(painting);
      }
    }
    return resultList;
  }

  private processColorFilter(rowList: PaintingListItem[]): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.colorsType === this.mColorFilter) {
        resultList.push(painting);
      }
    }
    return resultList;
  }

  private processStyleFilter(rowList: PaintingListItem[]): PaintingListItem[] {
    const resultList: PaintingListItem[] = [];
    for (const painting of rowList) {
      if (painting.artType === this.mArtTypeFilter) {
        resultList.push(painting);
      }
    }
    return resultList;
  }
}
