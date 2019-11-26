import {Injectable} from '@angular/core';
import {ArtistListItem} from '../entity/artist-list-item';

@Injectable({
  providedIn: 'root'
})
export class ArtistFilterService {
  private readonly originalList: ArtistListItem[] = [];

  // region Filters Keywords, Java Style for Class Members Naming :)
  private mArtistNameFilter: string = null;
  private mArtTypeFilter: string = null;

  constructor(private rowList: ArtistListItem[]) {
    this.originalList = rowList;
  }

  public deactivateAllFilters(): ArtistListItem[] {
    this.mArtistNameFilter = null;
    this.mArtTypeFilter = null;
    return this.getFilteredList();
  }

  public activateArtistNameFilter(artistName: string): ArtistListItem[] {
    this.mArtistNameFilter = artistName;
    return this.getFilteredList();
  }

  public deactivateArtistNameFilter(): ArtistListItem[] {
    this.mArtistNameFilter = null;
    return this.getFilteredList();
  }

  public activateStyleNameFilter(artTypeName: string): ArtistListItem[] {
    this.mArtTypeFilter = artTypeName;
    return this.getFilteredList();
  }

  public deactivateStyleNameFilter(): ArtistListItem[] {
    this.mArtTypeFilter = null;
    return this.getFilteredList();
  }

  private getFilteredList(): ArtistListItem[] {
    let resultList = this.originalList;
    if (this.mArtistNameFilter !== null) {
      resultList = this.processArtistNameFilter(resultList);
    }
    if (this.mArtTypeFilter !== null) {
      resultList = this.processStyleFilter(resultList);
    }
    return resultList;
  }

  private processArtistNameFilter(rowList: ArtistListItem[]): ArtistListItem[] {
    const resultList: ArtistListItem[] = [];
    for (const artist of rowList) {
      if (artist.name === this.mArtistNameFilter) {
        resultList.push(artist);
      }
    }
    return resultList;
  }

  private processStyleFilter(rowList: ArtistListItem[]): ArtistListItem[] {
    const resultList: ArtistListItem[] = [];
    for (const artist of rowList) {
      if (artist.artType === this.mArtTypeFilter) {
        resultList.push(artist);
      }
    }
    return resultList;
  }
}
