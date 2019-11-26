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
import {UserConfig} from '../../../UserConfig';
import {EMPTY, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
              private userService: UserProfileService) {
    super(interactionsManagerService, pageTypeToApi, interactionTypeToNumberService);
  }

  // region Love Getter Methods
  public initLove(parentType, rowId) {
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
              this.getClientInteraction(this.userInfo.id, parentType, rowId);
            }
          }
      );
    } else if (this.checkUserDetailsExists(this.userInfo)) {
      console.log('User Exists, Requesting Love Status');
      this.getClientInteraction(this.userInfo.id, parentType, rowId);
    }
  }


  // Get The All Client Interaction(love, view, follow) Dependence On Client ID
  private getClientInteraction(clientId: number, parentType: number, rowId) {
    // Fetch Entity Number
    const entityName = this.pageTypeToApi.convertApiTypeToPageType(parentType.toString());
    // check if user is login or not
    return this.interactionsManagerService.getClientInteraction(clientId)
        .pipe(catchError(err => {
      this.loveSubject.error('Error Getting Data');
      return EMPTY;
    })).subscribe(
        (res: { Data: any }) => {
          console.log('Response For Love Interactions : ', res);
          res.Data.map(response => {  // Response: {entity: "painting", id: 2, interaction: "like", interactionID: 103}
            // Check For Entity Name and Interaction IS Like
            if (response.entity === entityName && response.interaction === 'like') {
              // Check For Specify Painting
              if (response.id === rowId) {
                this.loveSubject.next({success: true, value: response});
              }
            }
          });
        }, error => {
          console.log('Error From getClientInteraction From Love service : ');
        }
    );
  }

}
