import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageTypeToNumberService {
  public static ENTITY_TYPE_PAINTING    = 'painting';
  public static ENTITY_TYPE_ARTIST      = 'artist';
  public static ENTITY_TYPE_ART_TYPE    = 'art-type';
  public static ENTITY_TYPE_AUCTION     = 'auction';
  public static ENTITY_TYPE_STATUE      = 'statue';

  private routes: {pageType: string, pageNumber: string}[] = [
    {pageType: PageTypeToNumberService.ENTITY_TYPE_PAINTING, pageNumber: '1'},
    {pageType: PageTypeToNumberService.ENTITY_TYPE_ARTIST, pageNumber: '2'},
    {pageType: PageTypeToNumberService.ENTITY_TYPE_ART_TYPE, pageNumber: '3'},
    {pageType: PageTypeToNumberService.ENTITY_TYPE_AUCTION, pageNumber: '4'},
    {pageType: PageTypeToNumberService.ENTITY_TYPE_STATUE, pageNumber: '6'},
  ];
  constructor() {
  }

  // Convert from string to number
  convertPageTypeToNumber(pageType: string): string {
    for (const i of this.routes) {
      if (pageType === i.pageType) {
        return i.pageNumber;
      }
    }
  }

}
