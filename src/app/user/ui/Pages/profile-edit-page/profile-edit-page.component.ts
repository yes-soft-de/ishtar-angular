import { Component, OnInit } from '@angular/core';
import {UploadManagerService} from '../../../manager/upload/upload-manager.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {

  constructor(private uploadService: UploadManagerService) { }

  ngOnInit() {
  }

  public onImageSelected() {
  }
}
