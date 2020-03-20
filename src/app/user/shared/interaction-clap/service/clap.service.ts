import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {MatDialog} from '@angular/material/dialog';
import {InteractionsService} from '../../../interactions/service/interactions.service';
import {UserService} from '../../user-services/service/user.service';
import {UserInfo} from '../../user-services/entity/user-info';

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
  getClaps(pageId: number) {
    return this.getClientClap(pageId);
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

