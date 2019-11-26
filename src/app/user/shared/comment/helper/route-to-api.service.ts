import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteToAPIService {
  public static ENTITY_TYPE_PAINTING = 1;
  public static ENTITY_TYPE_ARTIST = 2;
  public static ENTITY_TYPE_ART_TYPE = 3;
  public static ENTITY_TYPE_AUCTION = 4;
  public static ENTITY_TYPE_STATUE = 6;
  private routes: {pageRoute: string, ApiType: string}[] = [
    {pageRoute: 'painting', ApiType: '1'},
    {pageRoute: 'art-type', ApiType: '3'},
    {pageRoute: 'artist', ApiType: '2'},
    {pageRoute: 'statue', ApiType: '6'},
    {pageRoute: 'auction', ApiType: '4'},
  ];
  constructor() {
  }

  convertPageTypeToApiType(pageRoute: string): string {
    for (const i of this.routes) {
      if (pageRoute === i.pageRoute) {
        return i.ApiType;
      }
    }
  }
}
