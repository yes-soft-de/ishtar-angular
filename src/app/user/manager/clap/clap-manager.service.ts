import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Subject} from 'rxjs';
import {ClapResponse} from '../../entity-protected/clap/clap-response';
import {ClapRequest} from '../../entity-protected/clap/clap-request';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {UserConfig} from '../../UserConfig';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';
import {ClapRepoService} from '../../repository/clap/clap-repo.service';

/**
 * Flow:
 * 1. Get User Id.
 * 2. Create Clap Request
 * 3. Post Clap Request
 */

@Injectable({
  providedIn: 'root'
})
export class ClapManagerService {
  // region Observable Objects
  private repoSubject: Subject<ClapResponse>;
  private repo$: Observable<ClapResponse>;

  private managerSubject: Subject<ClapResponse>;
  private manager$;
  // endregion

  // region Request Parameters
  private entityType: number;
  private paintingId: string;
  private userId: number;
  private clapValue: number;
  // endregion

  constructor(private userProfileManager: UserProfileManagerService,
              private clapRepo: ClapRepoService) {
    this.managerSubject = new Subject<ClapResponse>();
    this.manager$ = this.managerSubject.asObservable();
  }

  // This Selects the Type and Redirect To Creating the Clap
  // region Manager Facade
  public createPaintingClap(paintingId: string, clapValue: number) {
    this.entityType = InteractionConsts.ENTITY_TYPE_PAINTING;
    this.createClap(paintingId, clapValue);
  }

  public createArtistClap(paintingId: string, clapValue: number) {
    this.entityType = InteractionConsts.ENTITY_TYPE_ARTIST;
    this.createClap(paintingId, clapValue);
  }

  // endregion

  // (1) The Real Request starts Here
  private createClap(paintingId: string, clapValue: number) {
    this.repoSubject = new Subject<ClapResponse>();
    this.repo$ = this.repoSubject.asObservable();

    this.paintingId = paintingId;
    this.clapValue = clapValue;

    // Create Repo Observables
    this.repoSubject = new Subject<ClapResponse>();
    this.repo$ = this.repoSubject.asObservable();

    this.logRepoError();

    // this Returns User Id, Which is Used in the Request, and Redirect To Posting the Request
    this.getUserProfile();
  }

  // (2) The User Profile Request
  private getUserProfile() {
    this.userProfileManager.getManagerObservable().subscribe(
      data => {
        this.userId = data.id;
        this.requestCreateClap();
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
  }

  // (3) The Create Clap Request
  private requestCreateClap() {
    const clapRequest: ClapRequest = {
      row: this.paintingId,
      entity: this.entityType,
      client: this.userId,
      value: this.clapValue
    };
    this.clapRepo.createClap(clapRequest, this.repoSubject);
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
