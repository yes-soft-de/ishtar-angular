import {Injectable} from '@angular/core';
import {PageTypeToNumberService} from '../../helper/page-type-to-number.service';
import {InteractionsService} from '../../../interactions/service/interactions.service';
import {InteractionsManagerService} from '../../../interactions/manager/interactions-manager.service';
import {InteractionConstantService} from '../../../interactions/service/interaction-constant.service';
import {UserInfo} from '../../../entity/user/user-info';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {UserService} from '../../user/service/user.service';
import { LoveEntity } from '../entity/love-entity';

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
  }

  // Check if The User is login to make his love interactionTypeString
  postLove(entityType: string, entityId: number, interactionsType: string): Observable<any> {
    if (!this.checkUserDetailsExists(this.userInfo)) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      return this.postInteractionToAPI(entityType, entityId, this.userInfo.id, interactionsType, this.loveSubject);
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

  getLoveStatus(parentType: string, rowId: number): Observable<LoveEntity> {
    const loveSubject = new Subject<LoveEntity>();

    if (!this.userService.isLoggedIn()) {
      loveSubject.error('Please Login');
    } else {
      this.userService.getUserInfo().subscribe(
        userData => {
        }, error => {
          console.log(JSON.stringify(error));
          loveSubject.error('Error Getting Data from Backend!');
        }
      );
    }

    return loveSubject.asObservable();
  }

}
