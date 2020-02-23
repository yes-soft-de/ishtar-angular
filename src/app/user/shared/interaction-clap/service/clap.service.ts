import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserInfo} from '../../../entity/user/user-info';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {PageTypeToNumberService} from '../../helper/page-type-to-number.service';
import {InteractionConstantService} from '../../../interactions/service/interaction-constant.service';
import {MatDialog} from '@angular/material';
import {InteractionsService} from '../../../interactions/service/interactions.service';
import {UserService} from '../../user/service/user.service';
import {IshtarClientService} from '../../client/ishtar-client.service';

@Injectable({
  providedIn: 'root'
})
export class ClapService extends InteractionsService {
  private clapSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;
  userLoggedIn = false;

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected userService: UserService,
              protected dialog: MatDialog) {
      super(interactionsManagerService,
        userService,
        dialog);

      this.setClientInfoIfExists();
  }

  // region Love Getter Methods
  getClaps() {
    return this.getClientClap();
  }

  // Check if The User is login to make his clap interactionTypeString
  postClap(entityType: number, entityId: number, clapValue: number): Observable<number> {
    return this.postClapToAPI(entityType, entityId, clapValue);
  }

  // Delete Clap Interactions
  deleteClapInteraction(interactionID: number) {
    return this.deleteClap(interactionID);
  }
}

