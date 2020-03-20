import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {UserInfo} from '../../../shared/user-services/entity/user-info';

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

  constructor(private router: Router,
              private fb: FormBuilder,
              private toaster: ToastrService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  updateForm() {
  }

  saveChanges() {
  }

  uploadNewImage(newImage: any) {
  }
}
