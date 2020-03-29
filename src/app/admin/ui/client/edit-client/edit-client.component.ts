import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClientService} from '../../../service/client/client.service';
import {ClientInterface} from '../../../entity/client/client-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {Client} from '../../../entity/client/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
  providers: [ DatePipe ]     // Add DatePipe from @angular/common
})
export class EditClientComponent implements OnInit {
  clientID: number;
  clientData: Client;
  oldPassword: string;        // To Store The Old Password
  uploadForm: FormGroup;
  uploadButtonValue = 'Upload';
  imageName = 'Leave it if you don\'t want to change image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = true;
  submitButtonValue = 'Update client';
  selectedFile: ImageSnippet;


  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private toaster: ToastrService,
              private router: Router,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Fetch client Id
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.clientID = Number(param.get('id'));
    });
    this.clientService.getClientUsingId(this.clientID).subscribe(
        (data: { Data: Client }) => {
          this.clientData = data.Data;
          this.oldPassword = this.clientData['0'].password;
          const birth = data.Data['0'].birthDate ?
              this.datePipe.transform(new Date(this.clientData['0'].birthDate.timestamp), 'yyyy-MM-dd') : '';
          console.log('Admin Client: ', data);
          // setValue = patchValue: Not that setValue wont fail silently. But patchValue will fail silent. It is recommended to use patchValue therefore
          this.uploadForm.patchValue({  // insert input value into the form input
            // TODO Need to update after update the backend for image and all Date Fields
            fullName:   this.clientData['0'].fullName,
            image:      this.clientData.image,
            // image:      '../../../../../assets/default-avatar.jpg',
            username:   this.clientData['0'].username,
            email:      this.clientData['0'].email,
            birthDate:  birth,
            phone:      this.clientData['0'].phone
          });
        });

    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      fullName:   ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      username:   ['', [Validators.required, Validators.minLength(2)]],
      password:   ['', [Validators.minLength(3)]],
      birthDate:  ['', Validators.required],
      email:      ['', [Validators.required, Validators.email]],
      image:      [''],
      phone:      ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)]]
    });

  }

  // Select Image And Fetch Image Name
  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadButtonValue = 'Upload';
    this.imageName = file.name;
    this.fileSelected = true;
  }

  processFile(imageInput: any) {
    this.fileSelected = false;
    this.imagePathReady = false;
    this.uploadButtonValue = 'Uploading...';
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.clientService.uploadImage(this.selectedFile.file).subscribe(
          (res: any) => {
            console.log(res);
            this.imageUrl = res.url;
            this.uploadButtonValue = 'Uploaded';
            this.imagePathReady = true;
            this.submitButtonValue = 'Update client';
          });
    });
    reader.readAsDataURL(file);
  }

  mySubmit() {
    console.log('New Image URL:', this.imageUrl);
    if (!this.uploadForm.valid) {
      this.toaster.error(`Error: All Fields Are Required`);
      return false;
    } else {
      // Fetch All Form Data On Json Type
      // tslint:disable-next-line:no-shadowed-variable
      const formObj = this.uploadForm.getRawValue();
      // tslint:disable-next-line:triple-equals
      if (formObj.password == '') {
        formObj.password = this.oldPassword;
      }
      if (this.imageUrl) {
        formObj.image = this.imageUrl;
      }
      console.log('before update', this.clientID, formObj);
      this.clientService.updateClient(this.clientID, formObj).subscribe(
        data => {
          this.toaster.success('Client Updated Successfully');
          console.log('the request was successfully done', data);
        },
        error => {
          console.log('Error fetching data', error);
          this.toaster.error('Error : Please Try Again');
        },
        () => {
          // If Success Navigate to Admin List clients Page
          this.router.navigate(['list-clients']);
        }
      );
    }
  }
}
