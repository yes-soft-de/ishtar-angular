import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteToAPIService {
  private routes: {pageRoute: string, ApiType: string}[] = [
    {pageRoute: 'painting', ApiType: '1'},
    {pageRoute: 'art-type', ApiType: '3'},
    {pageRoute: 'artist', ApiType: '2'},
    {pageRoute: 'statue', ApiType: '6'},
    {pageRoute: 'auction', ApiType: '4'},
  ];
  constructor() {
  }

  // Convert from string to number
  convertPageTypeToApiType(pageRoute: string): string {
    for (const i of this.routes) {
      if (pageRoute === i.pageRoute) {
        return i.ApiType;
      }
    }
  }

  // Convert from number to string
  convertApiTypeToPageType(ApiType: string): string {
    for (const i of this.routes) {
      if (ApiType === i.ApiType) {
        return i.pageRoute;
      }
    }
  }
}
