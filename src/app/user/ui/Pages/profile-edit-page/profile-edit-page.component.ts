import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UploadManagerService} from '../../../manager/upload/upload-manager.service';
import {UserProfileManagerService} from '../../../manager/user-profile/user-profile-manager.service';
import {UserInfo} from '../../../entity-protected/profile/user-info';
import {EditUserProfileManagerService} from '../../../manager/edit-user-profile/edit-user-profile-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ImageSnippet} from '../../../../admin/entity/image-snippet/image-snippet';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit, OnDestroy {
  profileEditForm: FormGroup;
  oldUserProfile: UserInfo;
  selectedFile;
  saveEditEnabled = true;
  imageUploadFinished = true;

  manager$: Observable<UserInfo>;

  constructor(private uploadService: UploadManagerService,
              private userProfileService: UserProfileManagerService,
              private editProfileService: EditUserProfileManagerService,
              private router: Router,
              private fb: FormBuilder,
              private toaster: ToastrService) {
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

    this.manager$ = this.userProfileService.getManagerObservable();
    this.manager$.subscribe(
      data => {
        this.oldUserProfile = data;
        this.updateForm();
      }
    );
    this.userProfileService.getUserProfile();

    this.editProfileService.getObservable().subscribe(
      () => {
        this.router.navigate(['/profile']);
      }
    );
  }

  ngOnDestroy(): void {
  }

  updateForm() {
    this.profileEditForm.get('email').setValue(this.oldUserProfile.email);
    this.profileEditForm.get('password').setValue(this.oldUserProfile.password);
    this.profileEditForm.get('username').setValue(this.oldUserProfile.username);
    this.profileEditForm.get('birthDate').setValue(this.oldUserProfile.birthDate);
    this.profileEditForm.get('phone').setValue(this.oldUserProfile.phone);
    this.profileEditForm.get('image').setValue(this.oldUserProfile.image);
    this.profileEditForm.get('fullName').setValue(this.oldUserProfile.fullName);
  }

  saveChanges() {
    // Do Something
    this.editProfileService.requestProfileEdit(this.oldUserProfile.id, this.profileEditForm);
  }

  uploadNewImage(newImage: any) {
    this.imageUploadFinished = false;
    this.toaster.info('Image is Uploading... Please Wait');
    const myImage: File = newImage.files[0];
    console.log('Image Selected With Name: ' + myImage.name);
    this.saveEditEnabled = false;

    this.uploadService.getObservable().subscribe(
      data => {
        this.profileEditForm.get('image').setValue(data.url);
        this.saveEditEnabled = true;
        this.imageUploadFinished = true;
        this.toaster.success('Image Upload is Finished!');
      }
    );

    this.uploadService.uploadAvatarImage(myImage);
  }
}
