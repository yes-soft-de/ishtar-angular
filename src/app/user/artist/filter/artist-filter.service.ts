import {Injectable} from '@angular/core';
import {ArtistListItem} from '../entity/artist-list-item';

@Injectable({
  providedIn: 'root'
})
export class ArtistFilterService {
  private readonly originalList: ArtistListItem[] = [];

  // region Filters Keywords, Java Style for Class Members Naming :)
  private mArtTypeFilter: string = null;
  // Needle Of a Name String
  private mArtistNameFilter: string = null;

  constructor(private rowList: ArtistListItem[]) {
    this.originalList = rowList;
  }

  public deactivateAllFilters(): ArtistListItem[] {
    this.mArtistNameFilter = null;
    this.mArtTypeFilter = null;
    return this.getFilteredList();
  }

  public sortArtistsByFollowerNumberAsc() {
    return this.originalList.sort(
      (a, b) => (Number(a.artistFollowers) > Number(b.artistFollowers))
        ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
          ? ((Number(a.artistFollowers) > Number(b.artistFollowers))
            ? 1 : -1) : -1);
  }

  public sortArtistsByFollowerNumberDesc() {
    return this.sortArtistsByFollowerNumberAsc().reverse();
  }

  public activateArtistNameFilter(artistNameNeedle: string): ArtistListItem[] {
    this.mArtistNameFilter = artistNameNeedle;
    return this.getFilteredList();
  }

  public deactivateArtistNameFilter(): ArtistListItem[] {
    this.mArtistNameFilter = null;
    return this.getFilteredList();
  }

  public activateArtTypeNameFilter(artTypeName: string): ArtistListItem[] {
    this.mArtTypeFilter = artTypeName;
    return this.getFilteredList();
  }

  public deactivateArtTypeNameFilter(): ArtistListItem[] {
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
      if (artist.name.includes(this.mArtistNameFilter)) {
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
