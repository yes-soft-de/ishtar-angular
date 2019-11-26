import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoveRequest} from '../request/love-request';
import {LoveManagerService} from '../manager/love-manager.service';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {RouteToAPIService} from '../../comment/helper/route-to-api.service';
import {InteractionsService} from '../../../interactions/service/interactions.service';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {InteractionTypeToNumberService} from '../../../interactions/service/interaction-type-to-number.service';
import {UserInfo} from '../../../entity/user/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {Observable, Subject} from 'rxjs';
import {LoginPageComponent} from '../../../ui/Pages/login-page/login-page.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoveService extends InteractionsService {
  private loveSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: RouteToAPIService,
              protected interactionTypeToNumberService: InteractionTypeToNumberService,
              private userService: UserProfileService,
              public dialog: MatDialog) {
    super(interactionsManagerService, pageTypeToApi, interactionTypeToNumberService);
  }

  // region Love Getter Methods
  public initLove(parentType, rowId) {
    // this.getClientInteraction(10, parentType, rowId, this.loveSubject);
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
              this.getClientInteraction(this.userInfo.id, parentType, rowId, this.loveSubject);
            }
          }
      );
    } else if (this.checkUserDetailsExists(this.userInfo)) {
      console.log('User Exists, Requesting Love Status');
      this.getClientInteraction(this.userInfo.id, parentType, rowId, this.loveSubject);
    }
  }

  // Check if The User is login to make his love interaction
  public postLove(entityType: string, entityId: number, interactionsType: string) {
    if (!this.checkUserDetailsExists(this.userInfo)) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('Sending Love interaction');
      this.postInteractionToAPI(entityType, entityId, this.userInfo, interactionsType, this.loveSubject);
    }
  }

  getLoveObservable(): Observable<any> {
    return this.getInteractionsObservable(this.loveSubject);
  }


}
