import {Injectable} from '@angular/core';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';

@Injectable({
  providedIn: 'root'
})
export class RouteToPageTypeService {

  constructor() {
  }

  public getPageType(route: string) {
    switch (route) {
      case 'painting':
        return InteractionConsts.ENTITY_TYPE_PAINTING;
      case 'artist':
        return InteractionConsts.ENTITY_TYPE_ARTIST;
      case 'art-type':
        return InteractionConsts.ENTITY_TYPE_ART_TYPE;
      case 'auction':
        return InteractionConsts.ENTITY_TYPE_AUCTION;
      default:
        throw Error('Error Finding Page Type');
    }
  }
}
