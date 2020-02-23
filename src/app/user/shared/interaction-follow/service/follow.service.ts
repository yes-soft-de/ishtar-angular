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
  getIsFollowed(parentType: string, rowId: number): Observable<boolean> {
    const interactionSubject = new Subject<boolean>();

    if (this.userInfo === null) {
      interactionSubject.next(false);
      return interactionSubject.asObservable();
    }

    this.getClientInteraction(this.userInfo.id).subscribe(
      clientInteractionList => {
        interactionSubject.next(clientInteractionList.filter(item => {
          if (item.id !== rowId) {
            return false;
          }
          if (item.entity !== parentType) {
            return false;
          }
          if (item.interaction === 'follow') {
            // It means that the 2 ifs above was passed, and it can be love or like
            return true;
          }
          return false;
        }).length > 0);
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
  postFollow(entityType: number, entityId: number, interactionsType: string): Observable<boolean> {
    if (!this.checkUserDetailsExists()) {
      // Open Dialog Box If User Not Login
      this.openDialog();
    } else {
      return this.postInteractionToAPI(entityType, entityId, InteractionConstantService.INTERACTION_TYPE_FOLLOW);
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
