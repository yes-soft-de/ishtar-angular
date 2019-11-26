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
}
