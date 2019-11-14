import {Injectable} from '@angular/core';
import {EditProfileRepoService} from '../../repository/edit-profile/edit-profile-repo.service';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';
import {Observable, Subject} from 'rxjs';
import {UserProfileResponse} from '../../entity-protected/profile/user-profile-response';
import {Router} from '@angular/router';
import {EditProfileResponse} from '../../entity-protected/edit-profile/edit-profile-response';
import {EditProfileRequest} from '../../entity-protected/edit-profile/edit-profile-request';

@Injectable({
  providedIn: 'root'
})
export class EditUserProfileManagerService {
  userId: string;
  editRequestPayload: EditProfileRequest;

  eventHandler: Subject<EditProfileResponse>;

  constructor(private editProfileRepo: EditProfileRepoService,
              private userProfileManager: UserProfileManagerService,
              private router: Router) {
    this.eventHandler = new Subject<EditProfileResponse>();
    this.logEditError();
  }

  private logEditError() {
    this.eventHandler.asObservable().subscribe(
      data => {
        // (2) This Fires When We Get the User Profile Correct Response!
        this.editProfile();
      }, error1 => {
        // This Fires If Error Happen
        this.router.navigate(['/']);
      }
    );
  }

  public requestProfileEdit(userId, rowForm) {
    this.editRequestPayload = rowForm as EditProfileRequest;
    this.userId = userId;

    this.editProfile();
  }

  private editProfile() {
    this.editProfileRepo.editProfile(this.userId, this.editRequestPayload, this.eventHandler);
  }

  public getObservable(): Observable<EditProfileResponse> {
    return this.eventHandler.asObservable();
  }
}
