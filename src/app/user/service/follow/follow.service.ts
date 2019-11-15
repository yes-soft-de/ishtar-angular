import { Injectable } from '@angular/core';
import {UserInfo} from '../../entity/user/user-info';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserProfileService} from '../client-profile/user-profile.service';
import {MatDialog} from '@angular/material';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {UserConfig} from '../../UserConfig';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {FollowInteractionResponse} from '../../entity/follow-interaction/follow-interaction-response';
import {FollowRequest} from '../../entity/follow-interaction/follow-request';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  userInfo: UserInfo;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              public dialog: MatDialog) { }


  public initFollow(parentType, rowId) {
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
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.getClientInteraction(this.userInfo.id, parentType, rowId);
    }
  }

  // Get The All Client Interaction(love, view, follow) Dependence On Client ID
  private getClientInteraction(clientId: number, parentType: number, rowId) {
    // check if user is login or not
    return this.httpClient.get(`${UserConfig.specificClientInteractions}/${clientId}`).subscribe(
        (res: {Data: any}) => {
          console.log('Response For Follow Interactions : ', res);
          res.Data.map(response => {  // Response: {entity: "artist", id: 2, interaction: "follow", interactionID: 103}
            // Check For Entity Name and Interaction IS follow
            if (response.entity === this.toEntityName(parentType) && response.interaction === 'follow') {
              // Check For Specify Painting
              if (response.id === rowId) {
                this.statusSubject.next({success: true, value: response});
              }
            }
          });
        }, error => {
          console.log('Error From getClientInteraction From Follow service : ', error);
        }
    );
  }

  public postFollow(entityId, entityType) {
    if (!this.checkUserDetailsExists()) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('Sending Follow interaction');
      this.postFollowToAPI(entityId, entityType);
    }
  }

  private postFollowToAPI(entityId, entityType) {
    const request: FollowRequest = {
      client: this.userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_FOLLOW
    };
    this.httpClient.post<FollowInteractionResponse>(`${UserConfig.interactionsAPI}`, JSON.stringify(request)).subscribe(
        (res: any) => {
        this.statusSubject.next({success: true, value: res});
      }
    );
  }

  // Delete Follow Interaction
  public deleteFollowInteraction(interactionID: number) {
    if (this.checkUserDetailsExists()) {
      return this.httpClient.delete(`${UserConfig.interactionAPI}/${interactionID}`
      ).subscribe(
          (res: any) => {
            console.log('Response deleted from Follow.service', res);
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

  private toEntityName(parentType) {
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
    } else if (parentType === 6) {
      entityName = 'statue';
    }
    return entityName;
  }
  // endregion
}
