import {Injectable} from '@angular/core';
import {InteractionsManagerService} from '../manager/interactions-manager.service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';
import {InteractionConstantService} from './interaction-constant.service';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {LoginPageComponent} from '../../ui/Pages/login-page/login-page.component';
import {MatDialog} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  private interactionsNumberSubject = new Subject<number>();

  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToNumberService: PageTypeToNumberService,
              protected interactionConstantService: InteractionConstantService,
              protected dialog: MatDialog) {
  }

  // Get Interactions number
  getInteractionsNumber(entity: number, row: number, interactionsCode: number): Observable<number> {
    const interactionSubject = new Subject<number>();
    this.interactionsManagerService.getInteractionsNumber(entity, row, interactionsCode)
      .pipe(
        catchError(() => {
          this.interactionsNumberSubject.error('Error Getting Data');
          return EMPTY;
        }))
        .subscribe(
      interactionResponse => {
        // Send Data If Successfully Fetching
            interactionSubject.next(interactionResponse.Data.interactions);
      }
    );
    // Return The Data To Print It In Component
    return interactionSubject.asObservable();
  }

  // Get The All Client Interaction(love, view, follow) Dependence On Client ID
  getClientInteraction(clientId: number, parentType: string, rowId: number, interactionSubject: Subject<any>) {
    // check if user is login or not
    return this.interactionsManagerService.getClientInteraction(clientId)
      .pipe(catchError(err => {
        interactionSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
        (clientInteractionsResponse: { Data: any }) => {
          // Response: {entity: "painting", id: 2, interactionTypeString: "like", interactionID: 103}
          clientInteractionsResponse.Data.map(interactionResponse => {
            if (interactionResponse.interactionTypeString === InteractionConstantService.INTERACTION_TYPE_LOVE) {
              // Check For EntityName Name and Interaction IS Like
              if (interactionResponse.entity === parentType) {
                // Check For Specify (artist, painting, ...)
                if (interactionResponse.id === rowId) {
                  interactionSubject.next({success: true, value: interactionResponse});
                }
              }
            }
            if (interactionResponse.interactionTypeString === InteractionConstantService.INTERACTION_TYPE_FOLLOW) {
              // Check For EntityName Name and Interaction IS Follow
              if (interactionResponse.entity === parentType) {
                // Check For Specify (artist, painting, ...)
                if (interactionResponse.id === rowId) {
                  interactionSubject.next({success: true, value: interactionResponse});
                }
              }
            }
          });
        }
      );
  }

  // Post Interactions (entityType: artistTableNumber, entityId: artistID, interactionsType = (love, follow, clap)
  postInteractionToAPI(entityType: string, entityId: number, userId: number, interactionsType: string, interactionSubject: Subject<any>) {
    // Convert EntityName Name To EntityName Type
    const entityTypeNumber = +this.pageTypeToNumberService.convertPageTypeToNumber(entityType);
    // Fetch Interactions Number
    const interactionsNumber = +this.interactionConstantService.convertInteractionsTypeToNumber(interactionsType);
    this.interactionsManagerService.postInteractions(entityTypeNumber, entityId, userId, interactionsNumber)
      .pipe(catchError(err => {
          interactionSubject.error('Error Getting Data');
          return EMPTY;
        }),
        map(oldStructureInteraction => {
          return {
            success: true,
            value: oldStructureInteraction.Data
          };
        }))
      .subscribe(
        (newStructureInteraction: any) => {
          interactionSubject.next(newStructureInteraction);
        }
      );
  }


  // Get The Client Clap Dependence On Client ID , entityName: string, rowId
  getClientClap(clientId: number, parentType: string, rowId: number, interactionSubject: Subject<any>) {
    return this.interactionsManagerService.getClientClap(clientId).subscribe(
      (clapInteractionsResponse: { Data: any }) => {
        clapInteractionsResponse.Data.map(clapResponse => {  // Response: {entity: "painting", id: 24, value: 54, ClapID: 1}
          // Check For EntityName Name and Interaction IS Clap
          if (clapResponse.entity === parentType) {
            // Check For Specify (artist, painting, ...)
            if (clapResponse.id === rowId) {
              interactionSubject.next({success: true, value: clapResponse});
            }
          }
        });
      }
    );
  }

  postClapToAPI(entityType: string, entityId: number, clapValue: number, userId: number, interactionSubject: Subject<any>) {
    // Convert EntityName Name To EntityName Type
    const entityTypeNumber = +this.pageTypeToNumberService.convertPageTypeToNumber(entityType);
    this.interactionsManagerService.postClap(entityTypeNumber, entityId, clapValue, userId)
      .pipe(catchError(err => {
        interactionSubject.error('Error Getting Data');
        return EMPTY;
      }))
      .subscribe(
        (createClapResponse: any) => {
          if (createClapResponse.Data.value > 0) {
            interactionSubject.next({success: true, value: createClapResponse});
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
          (deleteInteraction: any) => {
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
          (deleteClapResponse: any) => {
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
