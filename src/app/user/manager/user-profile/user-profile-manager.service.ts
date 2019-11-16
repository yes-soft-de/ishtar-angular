import {Injectable} from '@angular/core';
import {UserProfileRepoService} from '../../repository/profile/user-profile-repo.service';
import {Subject, Observable} from 'rxjs';
import {UserProfileResponse} from '../../entity-protected/profile/user-profile-response';
import {UserInfo} from '../../entity-protected/profile/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserProfileManagerService {
  private repoSubject: Subject<UserProfileResponse>;
  private repo$: Observable<UserProfileResponse>;

  private managerSubject: Subject<UserInfo>;
  private manager$: Observable<UserInfo>;

  constructor(private userProfileRepo: UserProfileRepoService) {
    this.managerSubject = new Subject<UserInfo>();
    this.manager$ = this.managerSubject.asObservable();
    this.logRepoError();
  }

  getUserProfile() {
    this.repoSubject = new Subject<UserProfileResponse>();
    this.repo$ = this.repoSubject.asObservable();
    this.userProfileRepo.requestUserProfile(this.repoSubject);
  }

  private logRepoError() {
    this.repo$.subscribe(
      () => {
      }, error1 => {
        console.log(error1);
      }
    );
  }

  private logManagerError() {
    this.manager$.subscribe(
      () => {
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getManagerObservable(): Observable<UserInfo> {
    return this.manager$;
  }
}
