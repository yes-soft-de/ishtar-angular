import { Injectable } from '@angular/core';
import { UserProfileRepoService } from '../../repository/profile/user-profile-repo.service';
import { Subject, Observable } from 'rxjs';
import { UserProfileResponse } from '../../entity-protected/profile/user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileManagerService {
  userProfileEventHandler: Subject<UserProfileResponse>;
  private userProfile$: Observable<UserProfileResponse>;

  constructor(private userProfileRepo: UserProfileRepoService) {
    this.userProfileEventHandler = new Subject<UserProfileResponse>();


  }

  getUserProfile(eventHandler?: Subject<UserProfileResponse>) {
    this.userProfileEventHandler = eventHandler;
    this.userProfileRepo.requestUserProfile(eventHandler);
  }

  public getProfileObservable(): Observable<UserProfileResponse> {
    return this.userProfile$;
  }

}
