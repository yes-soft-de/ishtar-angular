import {Component, Input, OnInit} from '@angular/core';
import {UploadManagerService} from '../../../manager/upload/upload-manager.service';
import {UserProfileManagerService} from '../../../manager/user-profile/user-profile-manager.service';
import {UserInfo} from '../../../entity-protected/profile/user-info';
import {EditUserProfileManagerService} from '../../../manager/edit-user-profile/edit-user-profile-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {
  profileEditForm: FormGroup;
  oldUserProfile: UserInfo;

  constructor(private uploadService: UploadManagerService,
              private userProfileService: UserProfileManagerService,
              private editProfileService: EditUserProfileManagerService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.profileEditForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    this.userProfileService.getProfileObservable().subscribe(
      data => {
        this.oldUserProfile = data.Data;
      }
    );
    this.userProfileService.getUserProfile();

    this.editProfileService.getObservable().subscribe(
      () => {
        this.router.navigate(['/profile']);
      }
    );
  }

  public onImageSelected() {
  }

  saveChanges() {
    // Do Something
    this.editProfileService.requestProfileEdit(this.oldUserProfile.id, this.profileEditForm.getRawValue());
  }
}
