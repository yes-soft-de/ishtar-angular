import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';
import {Painting} from '../../../entity/painting/painting';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminConfig} from '../../../AdminConfig';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  uploadForm: FormGroup;
  paintings: Painting[];
  imageName = 'Select File';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  selectedFile: ImageSnippet;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private photosListService: PhotosListService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private toast: ToastrService) {
  }

  ngOnInit() {
    // Fetch All Paintings
    this.photosListService.getAllPainting().subscribe(
        (res: PaintingListResponse) => {
          this.paintings = res.Data;
        }, error => {
          console.log(error);
        });
    // Storing Our Form Data
    this.uploadForm = this.formBuilder.group({
      media: [''],
      entity: [''],
      row: [''],
      name: [''],
      path: ['']
    });
  }

  onFileSelect(event) {
    /******
    // Uploading Multi Images
    // if (event.target.files.length > 0) {
    //   for (let i = 0; i < (event.target.files.length); i++) {
    //     this.file = event.target.files[i];
    //     this.myFiles.push(event.target.files[i]);
    //     this.uploadForm.get('path').setValue(this.myFiles);
    //   }
    // }
  *****/
  }

  // Get Image Name And Active Upload Button
  updateName(imageInput: any) {
   const file = imageInput.files[0];
   this.imageName = file.name;    // Display Image Name
   this.fileSelected = true;      // Active Upload Button
  }

  // Uploading THe File
  processFile(imageInput: any) {
    console.log('Progressing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.photosListService.uploadImage(this.selectedFile.file).subscribe(
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

// Method To Check if The form Fields Is Empty
  isEverythingFilled() {
    if (this.uploadForm.get('media').value.toString().length < 1) {
      return 'Media is not filled!';
    }
    if (this.uploadForm.get('entity').value.toString().length < 1) {
      return 'Entity is not filled!';
    }
    if (this.uploadForm.get('row').value.toString().length < 1) {
      return 'Row is not filled!';
    }
    if (this.uploadForm.get('name').value.toString().length < 1) {
      return 'Name is not filled!';
    }
    if (this.uploadForm.get('path').value.toString().length < 1) {
      return 'Path is not filled!';
    }
    return true;
  }

  // On Submit The Form
  mySubmit() {
    if (this.isEverythingFilled()) {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.httpClient.post(
          `${AdminConfig.addMediaAPI}`,
          JSON.stringify(formObj)
      ).subscribe(
          data => {
            this.toast.success('Media Was Successfully Added');
            console.log('the post request was successfully done', data);
          },
          error => {
            console.log('there error from fetching the data', error);
            this.toast.error(`Sorry There is An Error: ${error}`);
          },
          () => {
            // If Success Navigate to Admin Dashboard Page
            this.router.navigate(['../'], {relativeTo: this.route});
          }
      );
    } else {
      this.toast.error(`Error: ${this.isEverythingFilled()}`);
    }
  }
}
