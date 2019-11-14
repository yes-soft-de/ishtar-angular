import {Injectable} from '@angular/core';
import {UserProfileRepoService} from '../../repository/profile/user-profile-repo.service';
import {Subject, Observable} from 'rxjs';
import {UserProfileResponse} from '../../entity-protected/profile/user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileManagerService {
  userProfileEventHandler: Subject<UserProfileResponse>;
  private userProfile$: Observable<UserProfileResponse>;

  constructor(private userProfileRepo: UserProfileRepoService) {
    this.userProfileEventHandler = new Subject<UserProfileResponse>();
    this.userProfile$ = this.userProfileEventHandler.asObservable();
    this.logError();
  }

  getUserProfile() {
    this.userProfileRepo.requestUserProfile(this.userProfileEventHandler);
  }

  private logError() {
    this.userProfile$.subscribe(
      () => {
      }, error1 => {
        console.log(error1);
      }
    );
  }

  public getProfileObservable(): Observable<UserProfileResponse> {
    return this.userProfile$;
  }

}
