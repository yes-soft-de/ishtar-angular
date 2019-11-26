import {Injectable} from '@angular/core';
import {InteractionsManagerService} from '../manager/interactions-manager.service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RouteToAPIService} from '../../shared/comment/helper/route-to-api.service';
import {InteractionTypeToNumberService} from './interaction-type-to-number.service';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {UserProfileService} from '../../service/client-profile/user-profile.service';

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
