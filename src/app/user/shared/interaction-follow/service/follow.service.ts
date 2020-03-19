import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { InteractionsManagerService } from '../../../interactions/manager/interactions-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { InteractionsService } from '../../../interactions/service/interactions.service';
import { UserService } from '../../user/service/user.service';
import { InteractionConsts } from 'src/app/user/interactions/statics/interaction-consts';

@Injectable({
  providedIn: 'root'
})
export class FollowService extends InteractionsService {
  constructor(protected interactionsManagerService: InteractionsManagerService,
              protected userService: UserService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, userService, dialog);
    this.setClientInfoIfExists();
  }

  // region Follow Getter Methods
  getIsFollowed(parentType: string, rowId: number): Observable<number> {
    const interactionSubject = new Subject<number>();

    if (this.userInfo === null) {
      interactionSubject.next(-1);
      return interactionSubject.asObservable();
    }

    console.log('Looking for follows with rowID: ' + rowId);

    this.getClientInteraction(rowId).subscribe(
      clientInteractionList => {
        let followId = -1;
        for (const followInteraction of clientInteractionList.filter(item => {
          if (item.entity !== parentType) {
            return false;
          }
          return item.interaction === 'follow';
        })) {
          followId = followInteraction.interactionID;
        }

        interactionSubject.next(followId);
      }
    );

    return interactionSubject.asObservable();
  }

  /**
   * Check if The User is login to make his love interactionTypeString
   * @param entityType string ENTITY_TYPE_...
   * @param entityId number
   * @returns Observable<boolean>
   */
  postFollow(entityType: number, entityId: number): Observable<boolean> {
    if (!this.checkUserDetailsExists()) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      return this.postInteractionToAPI(entityType, entityId, `${InteractionConsts.INTERACTION_TYPE_FOLLOW}`);
    }
  }

  /**
   * Deletes Follow Interactions
   * @param interactionID number
   */
  deleteFollowInteraction(interactionID: number) {
    return this.deleteInteraction(interactionID);
  }
}
