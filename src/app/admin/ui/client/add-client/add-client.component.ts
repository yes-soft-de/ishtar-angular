import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../service/client/client.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Router} from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  uploadForm: FormGroup;

  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private photoListService: PhotosListService,
              private clientService: ClientService,
              private router: Router,
              private toast: ToastrService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      roll: [''],
      userName: [''],
      password: [''],
      email: [''],
      birthDate: [''],
      phone: [''],
      image: ['']
      // createDate: [''],
      // createdBy: [''],
      // updateDate: [''],
      // updatedBy: ['']
    });
  }

  // Select Image And Fetch Image Name
  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imageName = file.name;
    this.fileSelected = true;
  }

  //
  processFile(imageInput: any) {
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.photoListService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            console.log(res);
            this.imageUrl = res.url;
          },
          (err) => {
            console.log(err);
          });
    });

    reader.readAsDataURL(file);
  }

  // Check IF the Form Fields Is Empty
  isEverythingFilled() {
    if (this.uploadForm.get('firstName').value.toString().length.length < 1) {
      return 'First Name Is Not Filled';
    }
    if (this.uploadForm.get('lastName').value.toString().length < 1) {
      return 'Last Name Is Not Filled';
    }
    if (this.uploadForm.get('roll').value.toString().length < 1) {
      return 'Person Kind Is Not Filled';
    }
    if (this.uploadForm.get('userName').value.toString().length < 1) {
      return 'UserName Is Not Filled';
    }
    if (this.uploadForm.get('password').value.toString().length < 1) {
      return 'Password Is Not Filled';
    }
    if (this.uploadForm.get('email').value.toString().length < 1) {
      return 'Email Is Not Filled';
    }
    if (this.uploadForm.get('birthDate').value.toString().length < 1) {
      return 'Birth Date Is Not Filled';
    }
    if (this.uploadForm.get('phone').value.toString().length < 1) {
      return 'Phone Is Not Filled';
    }
    return true;
  }

  mySubmit() {
    console.log(`out:${this.isEverythingFilled()}`);
    if (this.isEverythingFilled()) {
      console.log(`In:${this.isEverythingFilled()}`);
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.clientService.postAddClient(formObj).subscribe(
          data => {
            console.log('the post request was successfully done', data);
            this.toast.success('Client Was Successfully Added');
          },
          error => {
            console.log('there error from fetching the data', error);
            this.toast.error(`Sorry There is An Error: ${error}`);
          },
          () => {
            this.router.navigate(['admin/list-clients']);
          }
      );
    } else {
      console.log(this.isEverythingFilled());
      this.toast.error(`Error: ${this.isEverythingFilled()}`);
    }
  }

}
