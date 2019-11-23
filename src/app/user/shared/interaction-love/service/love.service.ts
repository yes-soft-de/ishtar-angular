import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoveRequest} from '../request/love-request';
import {LoveManagerService} from '../manager/love-manager.service';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {RouteToPageTypeService} from './route-to-page-type.service';

@Injectable({
  providedIn: 'root'
})
export class LoveService {
  constructor(protected loveManager: LoveManagerService,
              protected routeToPageService: RouteToPageTypeService) {
  }

  createLove(pageType: string, pageId: number) {
    const loveRequest: LoveRequest = {
      entity: this.routeToPageService.getPageType(pageType),
      interaction: InteractionConsts.INTERACTION_TYPE_LOVE,
      row: pageId,
      client: 0
    };
    this.loveManager.createLove(loveRequest);
  }
}
