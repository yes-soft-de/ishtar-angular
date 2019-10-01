import { Injectable } from '@angular/core';
import {UserInfo} from '../../entity/user/user-info';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserProfileService} from '../client-profile/user-profile.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {LoveRequest} from '../../entity/love-interaction/love-request';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {LoveInteractionResponse} from '../../entity/love-interaction/love-interaction-response';
import {UserConfig} from '../../UserConfig';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  userInfo: UserInfo;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              private toaster: ToastrService,
              public dialog: MatDialog) {
  }

  public initFollow(entityId, entityType) {
    // See Who is Calling!
    if (!this.userRequestSent) {
      this.userRequestSent = true;
      this.userService.requestUserDetails().subscribe(
        user => {
          this.userInfo = user.Data;
          this.requestFollowStatus(entityId, entityType);
        }
      );
    } else {
      this.requestFollowStatus(entityId, entityType);
    }
  }

  // Then Ask For Love Interaction Details
  private requestFollowStatus(entityId, entityType) {
    const request: LoveRequest = {
      client: this.userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_LOVE
    };
    this.httpClient.post<LoveInteractionResponse>(UserConfig.getInteractionAPI, JSON.stringify(request)).subscribe(
      res => {
        console.log(`interactions ${res.Data[0].interactions}`);
        if (res.Data[0].interactions > 0) {
          this.statusSubject.next(true);
        }
      }
    );
  }

  public postFollow(entityId, entityType) {
    // See Who is Calling!
    if (!this.userRequestSent) {
      if (this.userInfo.id === undefined) {
        this.dialog.open(LoginPageComponent, {
          minWidth: '100vw',
          hasBackdrop: true
        });
        return;
      }
      this.userService.requestUserDetails().subscribe(
        user => {
          this.userInfo = user.Data;
          this.postFollowToAPI(entityId, entityType);
        }
      );
    } else {
      this.postFollowToAPI(entityId, entityType);
    }
  }

  private postFollowToAPI(entityId, entityType) {
    const request: LoveRequest = {
      client: this.userInfo.id,
      row: entityId,
      entity: entityType,
      interaction: InteractionConsts.INTERACTION_TYPE_LOVE
    };
    this.httpClient.post<LoveInteractionResponse>(UserConfig.postInteractionAPI, JSON.stringify(request)).subscribe(
      res => {
        console.log(res);
        this.statusSubject.next(true);
      }
    );
  }

  getStatusObservable(): Observable<any> {
    return this.statusSubject.asObservable();
  }
}
