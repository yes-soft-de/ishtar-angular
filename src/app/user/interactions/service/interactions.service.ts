import {Injectable} from '@angular/core';
import {InteractionsManagerService} from '../manager/interactions-manager.service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RouteToAPIService} from '../../shared/comment/helper/route-to-api.service';
import {InteractionTypeToNumberService} from './interaction-type-to-number.service';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private interactionsNumberSubject = new Subject<any>();

  constructor(private interactionsManagerService: InteractionsManagerService,
              private pageTypeToApi: RouteToAPIService,
              private interactionTypeToNumberService: InteractionTypeToNumberService) { }

  // Get Interactions number
  getInteractionsNumber(entity: string, row: number, interactionsType: string): Observable<any> {
    // Fetch Entity Number
    const entityNumber = +this.pageTypeToApi.convertPageTypeToApiType(entity);
    // Fetch Interactions Number
    const interactionsNumber = +this.interactionTypeToNumberService.convertinteractionsTypeToNumber(interactionsType);
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


  addViewInteraction(entityId: number, entityType: string) {
    if (!this.userRequestSent) {
      // If Not Request Him
      this.userRequestSent = true;
      this.userService.requestUserDetails().subscribe(
          (user: any) => {
            // Assign the Data to the User
            if (this.isUserNode(user.Data)) {
              console.log('Assigning User');
              this.userInfo = user.Data;
              this.postViewInteractions(entityId, entityType);
            }
          }
      );
    } else if (this.checkUserDetailsExists()) {
      console.log('User Exists, Requesting Love Status');
      this.postViewInteractions(entityId, entityType);
    }
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

  private toEntityId(itemType): number {
    let entityId = 0;
    if (itemType === 'painting') {
      entityId = 1;
    }
    if (itemType === 'artist') {
      entityId = 2;
    }
    if (itemType === 'artType') {
      entityId = 3;
    }
    if (itemType === 'statue') {
      entityId = 6;
    }
    return entityId;
  }

}
