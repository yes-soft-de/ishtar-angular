import { Injectable } from '@angular/core';
import { InteractionsService } from '../../../interactions/service/interactions.service';
import { InteractionsManagerService } from '../../../interactions/manager/interactions-manager.service';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoveService extends InteractionsService {
  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected userService: UserService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, userService, dialog);
    this.setClientInfoIfExists();
  }

  // Check if The User is login to make his love interactionType
  postLove(entityType: number, entityId: number, interactionsType: string): Observable<boolean> {
    if (!this.checkUserDetailsExists()) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      return this.postInteractionToAPI(entityType, entityId, interactionsType);
    }
  }

  // Delete Love Interactions
  deleteLoveInteraction(interactionID: number): Observable<boolean> {
    return this.deleteInteraction(interactionID);
  }

  getLoveStatus(parentType: string, rowId: number): Observable<number> {
    const loveSubject = new Subject<number>();
    if (!this.checkUserDetailsExists()) {
      loveSubject.error('Please Login!, user info doesn\'t exists');
      return loveSubject.asObservable();
    }

    this.getClientInteraction(rowId).subscribe(
      data => {
        let loveId = -1;
        for (const interaction of data.filter(
          // Just count the loves/likes, only 1 is needed by the way
          (item) => {
            if (item.id !== rowId) {
              console.log(`if1: ${item.id} !== ${rowId}`);
              return false;
            }
            if (item.entity !== parentType) {
              console.log(`if2: ${item.entity} !== ${parentType}`);
              return false;
            }
            if (item.interaction !== 'like' && item.interaction !== 'love') {
              // It means that the 2 ifs above was passed, and it can be love or like
              console.log(`if3: ${item.interaction} !== like`);
              return false;
            }
            return true;
          })) {
            loveId = interaction.interactionID;
          }
        loveSubject.next(loveId);
      }
    );
    return loveSubject.asObservable();
  }
}
