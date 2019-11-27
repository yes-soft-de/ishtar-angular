import {Injectable} from '@angular/core';
import {InteractionsManagerService} from '../manager/interactions-manager.service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RouteToAPIService} from '../../shared/comment/helper/route-to-api.service';
import {InteractionTypeToNumberService} from './interaction-type-to-number.service';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {UserProfileService} from '../../service/client-profile/user-profile.service';
import {LoveRequest} from '../../entity/love-interaction/love-request';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {LoveInteractionResponse} from '../../entity/love-interaction/love-interaction-response';
import {UserConfig} from '../../UserConfig';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private interactionsNumberSubject = new Subject<any>();

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: RouteToAPIService,
              protected interactionTypeToNumberService: InteractionTypeToNumberService,
              protected dialog: MatDialog) { }

  // Get Interactions number
  getInteractionsNumber(entity: string, row: number, interactionsType: string): Observable<any> {
    // Fetch Entity Number
    const entityNumber = +this.pageTypeToApi.convertPageTypeToApiType(entity);
    // Fetch Interactions Number
    const interactionsNumber = +this.interactionTypeToNumberService.convertInteractionsTypeToNumber(interactionsType);
    this.interactionsManagerService.getInteractionsNumber(entityNumber, row, interactionsNumber)
      .pipe(
        catchError(err => {
          this.interactionsNumberSubject.error('Error Getting Data');
          return EMPTY;
        }), map(res => {
            return {
            id: row,
            interactionType: interactionsType,
            interactionNumber: res.Data[0].interactions
          };
        })).subscribe(
          interactionsResponse => {
            // Send Data If Successfully Fetching
            this.interactionsNumberSubject.next(interactionsResponse);
      }
    );
    // Return The Data To Print It In Component
    return this.interactionsNumberSubject.asObservable();
  }

  // Get The All Client Interaction(love, view, follow) Dependence On Client ID
  getClientInteraction(clientId: number, parentType: string, rowId: number, interactionSubject: Subject<any>) {
    // check if user is login or not
    return this.interactionsManagerService.getClientInteraction(clientId)
        .pipe(catchError(err => {
          interactionSubject.error('Error Getting Data');
          return EMPTY;
        })).subscribe(
            (res: { Data: any }) => {
              // console.log('res: ', res);
              res.Data.map(response => {  // Response: {entity: "painting", id: 2, interaction: "like", interactionID: 103}
                if (response.interaction === 'like') {
                  // Check For Entity Name and Interaction IS Like
                  if (response.entity === parentType) {
                    // Check For Specify (artist, painting, ...)
                    if (response.id === rowId) {
                      interactionSubject.next({success: true, value: response});
                    }
                  }
                } else if (response.interaction === 'follow') {
                  // Check For Entity Name and Interaction IS Clap
                  if (response.entity === parentType) {
                    // Check For Specify (artist, painting, ...)
                    if (response.id === rowId) {
                      interactionSubject.next({success: true, value: response});
                    }
                  }
                } else if (response.interaction === 'clap') {
                  // Check For Entity Name and Interaction IS Clap
                  if (response.entity === parentType) {
                    // Check For Specify (artist, painting, ...)
                    if (response.id === rowId) {
                      interactionSubject.next({success: true, value: response});
                    }
                  }
                }
              });
            }
        );
  }

  // Post Interactions (entityType: artistTableNumber, entityId: artistId, interactionsType = (love, follow, clap)
  postInteractionToAPI(entityType: string, entityId: number, userId: number, interactionsType: string, interactionSubject: Subject<any>) {
    // Convert Entity Name To Entity Type
    const entityTypeNumber = +this.pageTypeToApi.convertPageTypeToApiType(entityType);
    // Fetch Interactions Number
    const interactionsNumber = +this.interactionTypeToNumberService.convertInteractionsTypeToNumber(interactionsType);
    this.interactionsManagerService.postInteractions(entityTypeNumber, entityId, userId, interactionsNumber)
        .pipe(catchError(err => {
            interactionSubject.error('Error Getting Data');
            return EMPTY;
          }),
          map(res => {
            return {
              success: true,
              value: res
            };
        }))
        .subscribe(
        (interactionsRes: any) => {
          interactionSubject.next(interactionsRes);
        }
    );
  }

  postClapToAPI(entityType: string, entityId: number, clapValue: number, userId: number, interactionSubject: Subject<any>) {
    // Convert Entity Name To Entity Type
    const entityTypeNumber = +this.pageTypeToApi.convertPageTypeToApiType(entityType);
    this.interactionsManagerService.postClap(entityTypeNumber, entityId, clapValue, userId)
      .pipe(catchError(err => {
        interactionSubject.error('Error Getting Data');
        return EMPTY;
      }))
      .subscribe(
          (res: any) => {
            console.log('Response from clap : ', res);
            if (res.Data.value > 0) {
              interactionSubject.next({success: true, value: res});
            }
          }
      );
  }

  // Delete Love Interaction
  deleteInteraction(interactionID: number, user: UserInfo, interactionSubject: Subject<any>) {
    if (this.checkUserDetailsExists(user)) {
      return this.interactionsManagerService.deleteInteractions(interactionID)
        .pipe(catchError(err => {
          interactionSubject.error('Error Getting Data');
          return EMPTY;
        }))
        .subscribe(
        (res: any) => {
          console.log('response deleted from love.service', res);
          interactionSubject.next(false);
        }
      );
    } else {
      return false;
    }
  }

  // Delete Clap Interaction
  deleteClap(interactionID: number, user: UserInfo, interactionSubject: Subject<any>) {
    if (this.checkUserDetailsExists(user)) {
      return this.interactionsManagerService.deleteClap(interactionID)
        .pipe(catchError(err => {
          interactionSubject.error('Error Getting Data');
          return EMPTY;
        }))
        .subscribe(
          (res: any) => {
            interactionSubject.next(false);
          }
        );
    } else {
      return false;
    }
  }

  getInteractionsObservable(interactionSubject: Subject<any>): Observable<any> {
    return interactionSubject.asObservable();
  }

  // Region Class To Open Dialog If User Not Login
  openDialog() {
    return this.dialog.open(LoginPageComponent, {
      minWidth: '100vw',
      hasBackdrop: true
    });
  }

  // region Class Specific Validators
  checkUserDetailsExists(user: UserInfo): boolean {
    if (user == null) {
      return false;
    }
    console.log('Apparently user data is ' + user.id !== null);
    return user.id !== undefined;
  }

  isUserNode(user: UserInfo) {
    return user.id !== undefined;
  }



}
