import {Injectable} from '@angular/core';
import {ArtistListItem} from '../entity/artist-list-item';

@Injectable({
  providedIn: 'root'
})
export class ArtistFilterService {

  constructor() {
  }

  public sortArtistsByFollowerNumberAsc(artistList: ArtistListItem[]) {
    return artistList.sort(
      (a, b) => (Number(a.artistFollowers) > Number(b.artistFollowers))
        ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
          ? ((Number(a.artistFollowers) > Number(b.artistFollowers))
            ? 1 : -1) : -1);
  }

  public sortArtistsByFollowerNumberDesc(artistList: ArtistListItem[]) {
    return this.sortArtistsByFollowerNumberAsc(artistList).reverse();
  }

  public processArtistNameFilter(rowList: ArtistListItem[], artistName: string): ArtistListItem[] {
    const resultList: ArtistListItem[] = [];
    for (const artist of rowList) {
      if (artist.name.includes(artistName)) {
        resultList.push(artist);
      }
    }
    return resultList;
  }

  public processArtTypeFilter(rowList: ArtistListItem[], artTypeName: string): ArtistListItem[] {
    const resultList: ArtistListItem[] = [];
    for (const artist of rowList) {
      if (artist.artType === artTypeName) {
        resultList.push(artist);
      }
    }
    return resultList;
  }
}
