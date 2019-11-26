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

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private interactionsNumberSubject = new Subject<any>();

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToApi: RouteToAPIService,
              protected interactionTypeToNumberService: InteractionTypeToNumberService) { }

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
  getClientInteraction(clientId: number, parentType: number, rowId, interactionSubject: Subject<any>) {
    // Fetch Entity Number
    const entityName = this.pageTypeToApi.convertApiTypeToPageType(parentType.toString());
    // check if user is login or not
    return this.interactionsManagerService.getClientInteraction(clientId)
        .pipe(catchError(err => {
          interactionSubject.error('Error Getting Data');
          return EMPTY;
        })).subscribe(
            (res: { Data: any }) => {
              console.log('Response For Love Interactions : ', res);
              res.Data.map(response => {  // Response: {entity: "painting", id: 2, interaction: "like", interactionID: 103}
                if (response.interaction === 'like') {
                  // Check For Entity Name and Interaction IS Like
                  if (response.entity === entityName) {
                    // Check For Specify (artist, painting, ...)
                    if (response.id === rowId) {
                      interactionSubject.next({success: true, value: response});
                    }
                  }
                } else if (response.interaction === 'follow') {
                  // Check For Entity Name and Interaction IS Clap
                  if (response.entity === entityName) {
                    // Check For Specify (artist, painting, ...)
                    if (response.id === rowId) {
                      interactionSubject.next({success: true, value: response});
                    }
                  }
                } else {
                  // Check For Entity Name and Interaction IS Clap
                  if (response.entity === entityName) {
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

  // region Post Interactions Methods
  postInteractionToAPI(entityType: string, entityId: number, userInfo: UserInfo, interactionsType: string, interactionSubject: Subject<any>) {
    // Fetch Entity Number
    const entityTypeNumber = +this.pageTypeToApi.convertPageTypeToApiType(entityType);
    // Fetch Interactions Number
    const interactionsNumber = +this.interactionTypeToNumberService.convertInteractionsTypeToNumber(interactionsType);
    this.interactionsManagerService.postInteractions(entityTypeNumber, entityId, userInfo, interactionsNumber)
        .pipe(map(res => {
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

  getInteractionsObservable(interactionSubject: Subject<any>): Observable<any> {
    return interactionSubject.asObservable();
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
