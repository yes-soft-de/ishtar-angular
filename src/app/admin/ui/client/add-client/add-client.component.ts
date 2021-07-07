import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../service/client/client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  isSubmitted = false;
  uploadForm: FormGroup;
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private photoListService: PhotosListService,
              private clientService: ClientService,
              private router: Router,
              private toast: ToastrService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      roll: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      image: ['']
      // createDate: [''],
      // createdBy: [''],
      // updateDate: [''],
      // updatedBy: ['']
    });
  }

  // Choose Roll Using Select Dropdown
  changeRoll(event) {
    this.uploadForm.get('roll').setValue(event.target.value, {
      onlySelf : true
    });
  }

  // Select Image And Fetch Image Name
  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadButtonValue = 'Upload';
    this.imageName = file.name;
    this.fileSelected = true;
  }

  //
  processFile(imageInput: any) {
    this.fileSelected = false;
    this.uploadButtonValue = 'Uploading...';
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.photoListService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            console.log(res);
            this.imageUrl = res.url;
            this.uploadButtonValue = 'Uploaded';
            this.imagePathReady = true;
            this.submitButtonValue = 'Add New Client';
          },
          (err) => {
            console.log(err);
          });
    });

    reader.readAsDataURL(file);
  }


  mySubmit() {
    this.isSubmitted = true;
    if (!this.uploadForm.valid) {
      this.toast.error('Error : Form Not Valid');
      return false;
    } else {
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.clientService.postAddClient(formObj).subscribe(
          data => {
            console.log('the post request was successfully done', data);
            this.toast.success('Client Was Successfully Added');
          },
          error => {
            console.log('Error from fetching the data :', error);
            this.toast.error('Error: Client Not Uploaded Successfully');
          },
          () => {
            this.router.navigate(['/admin/list-clients']);
          }
      );
    }
  }

}
