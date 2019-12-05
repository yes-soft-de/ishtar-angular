import {Injectable} from '@angular/core';
import {PageTypeToNumberService} from '../../helper/page-type-to-number.service';
import {InteractionsService} from '../../../interactions/service/interactions.service';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {InteractionConstantService} from '../../../interactions/service/interaction-constant.service';
import {UserInfo} from '../../../entity/user/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {UserService} from '../../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoveService extends InteractionsService {
  private loveSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;
  userLoggedIn = false;

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: PageTypeToNumberService,
              protected interactionTypeToNumberService: InteractionConstantService,
              private userProfileService: UserProfileService,
              private userService: UserService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, pageTypeToApi, interactionTypeToNumberService, dialog);
  }

  // region Love Getter Methods
  initLove(parentType: string, rowId: number) {
    this.userLoggedIn = this.userService.isLoggedIn();
    if (this.userLoggedIn) {
      this.userService.getUserInfo().subscribe(
          userInfoResponse => {
            // Assign the Data to the User
            if (this.isUserNode(userInfoResponse)) {
              console.log('Assigning User');
              this.userInfo = userInfoResponse;
              this.getClientInteraction(this.userInfo.id, parentType, rowId, this.loveSubject);
            }
          }
      );
    }
    // See If Loading User
    // if (!this.userRequestSent) {
    //   // If Not Request Him
    //   this.userRequestSent = true;
    //   this.userProfileService.requestUserDetails().subscribe(
    //       (user: any) => {
    //         // Assign the Data to the User
    //         if (this.isUserNode(user.Data)) {
    //           console.log('Assigning User');
    //           this.userInfo = user.Data;
    //           this.getClientInteraction(this.userInfo.id, parentType, rowId, this.loveSubject);
    //         }
    //       }
    //   );
    // } else if (this.checkUserDetailsExists(this.userInfo)) {
    //   this.getClientInteraction(this.userInfo.id, parentType, rowId, this.loveSubject);
    // }
  }

  // Check if The User is login to make his love interaction
  postLove(entityType: string, entityId: number, interactionsType: string) {
    if (!this.checkUserDetailsExists(this.userInfo)) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      this.postInteractionToAPI(entityType, entityId, this.userInfo.id, interactionsType, this.loveSubject);
    }
  }

  // Delete Love Interactions
  deleteLoveInteraction(interactionID: number) {
    return this.deleteInteraction(interactionID, this.userInfo, this.loveSubject);
  }

  // Love Observable To Receive Sending Data
  getLoveObservable(): Observable<any> {
    return this.getInteractionsObservable(this.loveSubject);
  }


}
