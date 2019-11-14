import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {Observable, Subject} from 'rxjs';
import {UserProfileService} from '../client-profile/user-profile.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {UserConfig} from '../../UserConfig';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {CreateClapRequest} from '../../entity/clap/create-clap-request';
import {GetClapRequest} from '../../entity/clap/get-clap-request';
import {GetClapResponse} from '../../entity/clap/get-clap-response';
import {CreateClapResponse} from '../../entity/clap/create-clap-response';

@Injectable({
  providedIn: 'root'
})
export class ClapService {
  userInfo: UserInfo;
  userRequestSent = false;
  private statusSubject = new Subject<any>();

  constructor(private httpClient: HttpClient,
              private userService: UserProfileService,
              public dialog: MatDialog) {}

  public initClap(parentType, rowId) {
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
              this.getClientClap(this.userInfo.id, parentType, rowId);
            }
          }
      );
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.getClientClap(this.userInfo.id, parentType, rowId);
    }
  }


  // Get The Client Clap Dependence On Client ID , entityName: string, rowId
  public getClientClap(clientId: number, parentType: number, rowId) {
    return this.httpClient.get(`${UserConfig.specificClientClaps}/${clientId}`).subscribe(
        (res: {Data: any}) => {
          console.log('Response For Follow Interactions : ', res);
          res.Data.map(response => {  // Response: {entity: "painting", id: 24, value: 54, ClapID: 1}
            // Check For Entity Name and Interaction IS Clap
            if (response.entity === this.toEntityName(parentType)) {
              // Check For Specify Painting
              if (response.id === rowId) {
                this.statusSubject.next({success: true, value: response});
              }
            }
          });
        }, error => {
          console.log('Error From getClapInteraction  From Clap service : ', error);
        }
    );
  }

  public postClap(entityId, entityType, clapValue) {
    if (!this.checkUserDetailsExists()) {
      console.log('Hello My Dear Unknown User, Please Login!');
      this.dialog.open(LoginPageComponent, {
        minWidth: '100vw',
        hasBackdrop: true
      });
    } else {
      console.log('So My Dear User, Wanna Send Some Clap? Here we go');
      this.postClapToAPI(entityId, entityType, clapValue);
    }
  }

  private postClapToAPI(entityId, entityType, clapValue) {
    const request: CreateClapRequest = {
      client: this.userInfo.id,
      value: clapValue,
      entity: entityType,
      row: entityId
    };
    this.httpClient.post<CreateClapResponse>(`${UserConfig.clapsAPI}`, JSON.stringify(request)).subscribe(
        (res: any) => {
        console.log('Response from clap.service.ts : ', res);
        if (res.Data.value > 0) {
          this.statusSubject.next({success: true, value: res});
        }
      }
    );
  }

  // Delete Love Interaction
  public deleteClapInteraction(interactionID: number) {
    if (this.checkUserDetailsExists()) {
      return this.httpClient.delete(`${UserConfig.clapAPI}/${interactionID}`).subscribe(
          (res: any) => {
            console.log('response deleted from love.service', res);
            this.statusSubject.next(false);
          }
      );
    } else {
      return false;
    }
  }

  // Receive the response after we send the request using 'next' Observable
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
