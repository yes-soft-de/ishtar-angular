import {Injectable} from '@angular/core';
import {PaintingManagerService} from '../manager/painting-manager.service';
import {PaintingDetails} from '../entity/painting-details';
import {EMPTY, Observable, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PaintingListItem} from '../entity/painting-list-item';
import {InteractionsService} from '../../interactions/service/interactions.service';
import {InteractionsManagerService} from '../../interactions/manager/interactions-manager.service';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';
import {InteractionConstantService} from '../../interactions/service/interaction-constant.service';
import {MatDialog} from '@angular/material';
import {UserInfo} from '../../entity/user/user-info';
import {MostViewedListItem} from '../entity/most-viewed-list-item';
import {UserService} from '../../shared/user/service/user.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Painting Service Class For Subscribe Data And Send It To Component
 */
export class PaintingService extends InteractionsService {
  private paintingSubject = new Subject<PaintingDetails>();
  private paintingsListSubject = new Subject<PaintingListItem[]>();
  private paintingsListBySubject = new Subject<any>();
  private viewSubject = new Subject<any>();
  userInfo: UserInfo;
  userRequestSent = false;
  userLoggedIn = false;

  constructor(private paintingManager: PaintingManagerService,
              protected interactionsManagerService: InteractionsManagerService,
              protected pageTypeToNumberService: PageTypeToNumberService,
              protected interactionTypeToNumberService: InteractionConstantService,
              private userService: UserService,
              protected dialog: MatDialog) {
    super(interactionsManagerService, pageTypeToNumberService, interactionTypeToNumberService, dialog);
  }

  // Fetch All Paintings
  getPaintings(): Observable<PaintingListItem[]> {
    this.paintingManager.getPaintings()
      .pipe(catchError(err => {
        this.paintingsListSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingListResponse => {
        // Send Data If Successfully Fetching
        this.paintingsListSubject.next(paintingListResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingsListSubject.asObservable();
  }

  // Fetch Painting Details
  getPainting(paintingId): Observable<PaintingDetails> {
    this.paintingManager.getPainting(paintingId)
      .pipe(catchError(err => {
        this.paintingSubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingResponse => {
        // Send Data If Successfully Fetching
        this.paintingSubject.next(paintingResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingSubject.asObservable();
  }

  // Fetch Every Thing From Painting Table
  getPaintingListBy(paintingColumnName: string, paintingColumnValue: number): Observable<any> {
    this.paintingManager.getPaintingListBy(paintingColumnName, paintingColumnValue)
      .pipe(catchError(err => {
        this.paintingsListBySubject.error('Error Getting Data');
        return EMPTY;
      })).subscribe(
      paintingListByResponse => {
        this.paintingsListBySubject.next(paintingListByResponse.Data);
      }
    );
    // Return The Data To Print It In Component
    return this.paintingsListBySubject.asObservable();
  }

  // Add View Interaction When User Inter To The Painting Detail
  viewPainting(entityType: string, entityId: number) {
      this.userService.getUserInfo().subscribe(
        userInfoResponse => {
          // Assign the Data to the User
          if (this.isUserNode(userInfoResponse)) {
            console.log('Assigning User');
            this.userInfo = userInfoResponse;
            this.postInteractionToAPI(
              entityType,
              entityId,
              this.userInfo.id,
              InteractionConstantService.INTERACTION_TYPE_VIEW,
              this.viewSubject);
          }
        }
      );
  }

  getFeaturedPaintings(): Observable<PaintingListItem[]> {
    const featuredPaintingsSubject = new Subject<PaintingListItem[]>();
    this.paintingManager.getFeaturedPaintings().subscribe(
      paintingListResult => {
        featuredPaintingsSubject.next(paintingListResult.Data);
      }, error1 => {
        console.log(error1);
      }
    );

    return featuredPaintingsSubject.asObservable();
  }

  getMostViewedPaintings(): Observable<MostViewedListItem[]> {
    const mostViewedSubject = new Subject<MostViewedListItem[]>();
    this.paintingManager.getMostViewedPainting().subscribe(
      mostViewedResponse => {
        mostViewedSubject.next(mostViewedResponse.Data);
      }
    );
    return mostViewedSubject.asObservable();
  }
}
