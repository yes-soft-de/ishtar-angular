import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserInfo} from '../../../entity/user/user-info';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {PageTypeToNumberService} from '../../comment/helper/page-type-to-number.service';
import {InteractionConstantService} from '../../../interactions/service/interaction-constant.service';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {MatDialog} from '@angular/material';
import {InteractionsService} from '../../../interactions/service/interactions.service';

@Injectable({
  providedIn: 'root'
})
export class ClapService extends InteractionsService {
  private clapSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: PageTypeToNumberService,
              protected interactionTypeToNumberService: InteractionConstantService,
              private userService: UserProfileService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, pageTypeToApi, interactionTypeToNumberService, dialog);
  }

  // region Love Getter Methods
  initClap(parentType: string, rowId: number) {
    // See If Loading User
    if (!this.userRequestSent) {
      // If Not Request Him
      this.userRequestSent = true;
      this.userService.requestUserDetails().subscribe(
          (user: any) => {
            // Assign the Data to the User
            if (this.isUserNode(user.Data)) {
              console.log('Assigning User');
              this.userInfo = user.Data;
              this.getClientInteraction(this.userInfo.id, parentType, rowId, this.clapSubject);
            }
          }
      );
    } else if (this.checkUserDetailsExists(this.userInfo)) {
      console.log('User Exists, Requesting Clap Status');
      this.getClientInteraction(this.userInfo.id, parentType, rowId, this.clapSubject);
    }
  }

  // Check if The User is login to make his clap interaction
  postClap(entityType: string, entityId: number, clapValue: number) {
    if (!this.checkUserDetailsExists(this.userInfo)) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      console.log('Sending Clap interaction');
      this.postClapToAPI(entityType, entityId, clapValue, this.userInfo.id, this.clapSubject);
    }
  }

  // Delete Clap Interactions
  deleteClapInteraction(interactionID: number) {
    return this.deleteClap(interactionID, this.userInfo, this.clapSubject);
  }

  // Clap Observable To Receive Sending Data
  getClapObservable(): Observable<any> {
    return this.getInteractionsObservable(this.clapSubject);
  }

}

