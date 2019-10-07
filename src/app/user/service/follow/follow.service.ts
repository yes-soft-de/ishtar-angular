import { Injectable } from '@angular/core';
import {UserInfo} from '../../entity/user/user-info';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserProfileService} from '../client-profile/user-profile.service';
import {ToastrService} from 'ngx-toastr';
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
              public dialog: MatDialog) {
  }

  public initFollow(entityId, entityType) {
    // See If Loading User
    if (!this.userRequestSent) {
      // If Not Request Him
      this.userRequestSent = true;
      console.log('Loading User');
      this.userService.requestUserDetails().subscribe(
        user => {
          // Assign the Data to the User
          console.log('Got Response');
          if (this.isUserNode(user.Data)) {
            console.log('Assigning User');
            this.userInfo = user.Data;
            this.requestFollowStatus(entityId, entityType);
          }
        }
      );
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.requestFollowStatus(entityId, entityType);
    }
  }

  // Then Ask For Follow Interaction Details
  private requestFollowStatus(entityId, entityType) {
    const request: FollowRequest = {
      client: this.userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_FOLLOW
    };
    this.httpClient.post<FollowInteractionResponse>(`${UserConfig.getInteractionAPI}`, JSON.stringify(request)).subscribe(
      res => {
        console.log(`interactions ${res.Data[0].interactions}`);
        if (res.Data[0].interactions > 0) {
          this.statusSubject.next(true);
        }
      }
    );
  }

  public postFollow(entityId, entityType) {
    console.log('Post Love Requested!');
    if (!this.checkUserDetailsExists()) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('So My Dear User, Wanna Send Some Love? Here we go');
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
    this.httpClient.post<FollowInteractionResponse>(`${UserConfig.postInteractionAPI}`, JSON.stringify(request)).subscribe(
      res => {
        console.log(res);
        this.statusSubject.next(true);
      }
    );
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
  // endregion
}
