import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {UserProfileService} from '../client-profile/user-profile.service';
import {ToastrService} from 'ngx-toastr';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {LoveInteractionResponse} from '../../entity/love-interaction/love-interaction-response';
import {MatDialog} from '@angular/material';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {UserInfo} from '../../entity/user/user-info';
import {LoveRequest} from '../../entity/love-interaction/love-request';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoveService {
  userInfo: UserInfo;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              private toaster: ToastrService,
              public dialog: MatDialog) {
  }

  public initLove(entityId, entityType) {
    // See Who is Calling!
    if (!this.userRequestSent) {
      this.userRequestSent = true;
      this.userService.requestUserDetails().subscribe(
        user => {
          this.userInfo = user.Data;
          this.requestLoveStatus(entityId, entityType);
        }
      );
    } else {
      this.requestLoveStatus(entityId, entityType);
    }
  }

  // Then Ask For Love Interaction Details
  private requestLoveStatus(entityId, entityType) {
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

  public postLove(entityId, entityType) {
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
          this.postLoveToAPI(entityId, entityType);
        }
      );
    } else {
      this.postLoveToAPI(entityId, entityType);
    }
  }

  private postLoveToAPI(entityId, entityType) {
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

