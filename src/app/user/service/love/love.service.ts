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
  userInfo: UserInfo = null;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              private toaster: ToastrService,
              public dialog: MatDialog) {
  }

  // region Love Getter Methods
  public initLove(entityId, entityType) {
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
            this.requestLoveStatus(entityId, entityType);
          }
        }
      );
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.requestLoveStatus(entityId, entityType);
    }
  }

  // Then Ask For Love Interaction Details
  private requestLoveStatus(entityId, entityType) {
    console.log('Requesting Love Status ');
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

  // endregion
  // region Post Love Methods
  public postLove(entityId, entityType) {
    console.log('Post Love Requested!');
    if (!this.checkUserDetailsExists()) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('So My Dear User, Wanna Send Some Love? Here we go');
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

