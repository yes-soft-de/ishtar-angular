import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserInfo } from '../../../entity/user/user-info';
import { InteractionsManagerService } from '../../../interactions/manager/interactions-manager.service';
import { PageTypeToNumberService } from '../../helper/page-type-to-number.service';
import { InteractionConstantService } from '../../../interactions/service/interaction-constant.service';
import { MatDialog } from '@angular/material';
import { InteractionsService } from '../../../interactions/service/interactions.service';
import { UserService } from '../../user/service/user.service';
import { filter } from 'rxjs/operators';
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
        for (let followInteraction of clientInteractionList.filter(item => {
          if (item.entity !== parentType) {
            return false;
          }
          if (item.interaction !== 'follow') {
            // It means that the 2 ifs above was passed, and it can be love or like
            return false;
          }
          return true;
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
   * @param interactionsType number
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
