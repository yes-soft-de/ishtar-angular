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
export class FollowService extends InteractionsService {
  private followSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: PageTypeToNumberService,
              protected interactionTypeToNumberService: InteractionConstantService,
              private userService: UserProfileService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, pageTypeToApi, interactionTypeToNumberService, dialog);
  }

  // region Follow Getter Methods
  initFollow(parentType: string, rowId: number) {
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
              this.getClientInteraction(this.userInfo.id, parentType, rowId, this.followSubject);
            }
          }
      );
    } else if (this.checkUserDetailsExists(this.userInfo)) {
      this.getClientInteraction(this.userInfo.id, parentType, rowId, this.followSubject);
    }
  }

  // Check if The User is login to make his love interaction
  postFollow(entityType: string, entityId: number, interactionsType: string) {
    if (!this.checkUserDetailsExists(this.userInfo)) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      this.postInteractionToAPI(entityType, entityId, this.userInfo.id, interactionsType, this.followSubject);
    }
  }

  // Delete Love Interactions
  deleteFollowInteraction(interactionID: number) {
    return this.deleteInteraction(interactionID, this.userInfo, this.followSubject);
  }

  // Love Observable To Receive Sending Data
  getFollowObservable(): Observable<any> {
    return this.getInteractionsObservable(this.followSubject);
  }

}
