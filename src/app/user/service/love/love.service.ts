import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {UserProfileService} from '../client-profile/user-profile.service';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {LoveInteractionResponse} from '../../entity/love-interaction/love-interaction-response';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {UserInfo} from '../../entity/user/user-info';
import {LoveRequest} from '../../entity/love-interaction/love-request';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoveService {
  userInfo: UserInfo = null;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              public dialog: MatDialog) {}


  // Get The All Client Interaction(love, view, follow) Dependence On Client ID
  private getClientInteraction(clientId: number, parentType: number, rowId) {
    let entityName = '';
    // fetch entity name
    if (parentType === 1) {
      entityName = 'painting';
    } else if (parentType === 2) {
      entityName = 'artist';
    } else if (parentType === 3) {
      entityName = 'artType';
    } else if (parentType === 4) {
      entityName = 'auction';
    }
    // check if user is login or not
    const request: {client: number} = {
      client: clientId
    };
    return this.httpClient.post(
        `${UserConfig.getClientInteractionsAPI}`,
        JSON.stringify(request),
        {responseType: 'json'}
    ).subscribe(
        (res: {Data: any}) => {
          console.log('Response For Love Interactions : ', res);
          res.Data.map(response => {  // Response: {entity: "painting", id: 2, interaction: "like", interactionID: 103}
            // Check For Entity Name and Interaction IS Like
            if (response.entity === entityName && response.interaction === 'like') {
              // Check For Specify Painting
              if (response.id === rowId) {
                this.statusSubject.next({success: true, value: response});
              }
            }
          });
        }, error => {
          console.log('Error From getClientInteraction  From Love service : ', error);
        }
    );
  }

  // region Love Getter Methods
  public initLove(parentType, rowId) {
    // See If Loading User
    if (!this.userRequestSent) {
      // If Not Request Him
      this.userRequestSent = true;
      this.userService.requestUserDetails().subscribe(
        user => {
          // Assign the Data to the User
          if (this.isUserNode(user.Data)) {
            console.log('Assigning User');
            this.userInfo = user.Data;
            this.getClientInteraction(this.userInfo.id, parentType, rowId);
          }
        }
      );
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.getClientInteraction(this.userInfo.id, parentType, rowId);
    }
  }
  // endregion

  // Check if The User is login to make his love interaction
  public postLove(entityId, entityType) {
    if (!this.checkUserDetailsExists()) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('Sending Love interaction');
      this.postLoveToAPI(entityId, entityType);
    }
  }

  // region Post Love Methods
  private postLoveToAPI(entityId, entityType) {
    const request: LoveRequest = {
      client: this.userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_LOVE
    };
    this.httpClient.post<LoveInteractionResponse>(UserConfig.postInteractionAPI, JSON.stringify(request)).subscribe(
      res => {
        this.statusSubject.next({success: true, value: res});
      }
    );
  }

  // Delete Love Interaction
  public deleteLoveInteraction(interactionID: number) {
    if (this.checkUserDetailsExists()) {
      const request: {id: number} = {
        id: interactionID
      };
      return this.httpClient.post(
          `${UserConfig.deleteClientInteractionsAPI}`,
          JSON.stringify(request),
          {responseType: 'json'}
      ).subscribe(
          res => {
            console.log('response deleted from love.service', res);
            this.statusSubject.next(false);
          }
      );
    } else {
      return false;
    }
  }

  getStatusObservable(): Observable<any> {
    return this.statusSubject.asObservable();
  }

  // endregion

  // region Class Specific Validators
  private checkUserDetailsExists(): boolean {
    if (this.userInfo == null) {
      return false;
    }
    console.log('Apparently user data is ' + this.userInfo.id !== null);
    return this.userInfo.id !== undefined;
  }

  private isUserNode(user: UserInfo) {
    return user.id !== undefined;
  }
  // endregion
}

