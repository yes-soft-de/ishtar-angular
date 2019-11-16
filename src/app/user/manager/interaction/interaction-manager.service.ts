import {Injectable} from '@angular/core';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {Observable, Subject} from 'rxjs';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';
import {InteractionRepoService} from '../../repository/interaction/interaction-repo.service';
import {InteractionRequest} from '../../entity-protected/interaction/interaction-request';
import {InteractionResponse} from '../../entity/interaction/interaction-response';

@Injectable({
  providedIn: 'root'
})
export class InteractionManagerService {
  // region Observable Objects
  private repoSubject: Subject<InteractionResponse>;
  private repo$: Observable<InteractionResponse>;

  private managerSubject: Subject<InteractionResponse>;
  private manager$: Subject<InteractionResponse>;
  // endregion

  // region Request Parameters
  entity: number;
  row: string;
  interaction: number;
  client: number;

  // endregion

  constructor(private userProfileManager: UserProfileManagerService,
              private interactionRepo: InteractionRepoService) {
  }

  // This Selects the Type and Redirect To Creating the Clap
  // region Manager Facade
  public createPaintingLove(paintingId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_PAINTING;
    this.interaction = InteractionConsts.INTERACTION_TYPE_LOVE;
    this.createInteraction(paintingId);
  }

  public createArtistLove(paintingId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_ARTIST;
    this.interaction = InteractionConsts.INTERACTION_TYPE_LOVE;
    this.createInteraction(paintingId);
  }

  public createPaintingFollow(paintingId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_PAINTING;
    this.interaction = InteractionConsts.INTERACTION_TYPE_FOLLOW;
    this.createInteraction(paintingId);
  }

  public createArtistFollow(artistId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_ARTIST;
    this.interaction = InteractionConsts.INTERACTION_TYPE_FOLLOW;
    this.createInteraction(artistId);
  }

  public createPaintingView(paintingId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_PAINTING;
    this.interaction = InteractionConsts.INTERACTION_TYPE_VIEW;
    this.createInteraction(paintingId);
  }

  public createArtistView(artistId: string) {
    this.entity = InteractionConsts.ENTITY_TYPE_ARTIST;
    this.interaction = InteractionConsts.INTERACTION_TYPE_VIEW;
    this.createInteraction(artistId);
  }

  // endregion

  // (1) The Real Request starts Here
  private createInteraction(itemId: string) {
    this.repoSubject = new Subject<InteractionResponse>();
    this.repo$ = this.repoSubject.asObservable();

    this.row = itemId;

    // Create Repo Observables
    this.repoSubject = new Subject<InteractionResponse>();
    this.repo$ = this.repoSubject.asObservable();

    this.logRepoError();

    // (2) The User Profile Request
    this.userProfileManager.getManagerObservable().subscribe(
      data => {
        this.client = data.id;
        this.requestCreateClap();
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
  }

  // (3) The Create Clap Request
  private requestCreateClap() {
    const clapRequest: InteractionRequest = {
      row: this.row,
      entity: this.entity,
      client: this.client,
      interaction: this.interaction
    };
    this.interactionRepo.createInteraction(clapRequest, this.repoSubject);
  }

  private logRepoError() {
    this.repo$.subscribe(
      () => {
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getObservable() {
    return this.manager$;
  }
}
