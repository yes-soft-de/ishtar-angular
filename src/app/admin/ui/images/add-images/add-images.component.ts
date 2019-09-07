import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';
import {Painting} from '../../../entity/painting/painting';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminConfig} from '../../../AdminConfig';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  // options: any[] = [];
  uploadForm: FormGroup;
  paintings: Painting[];
  file: string;
  // myFiles = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private photosListService: PhotosListService,
              private httpClient: HttpClient,
              private formBuilder: FormBuilder) {
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
    // TODO how to get upload file path
    this.uploadForm = this.formBuilder.group({
      media: [''],
      entity: [''],
      row: [''],
      name: [''],
      path: ['']
    });
  }

  onFileSelect(event) {
    // Uploadin One Media
    if (event.target.files.length > 0) {
      const file = event.target.files[0].name;
      this.uploadForm.get('path').setValue(file);
    }

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

  mySubmit() {
    const formObj = this.uploadForm.getRawValue();
    console.log(formObj);
    // Start Http Request
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.httpClient.post<Painting>(
    //     'http://localhost:1337/localhost:8000/createMedia',
    //     JSON.stringify(formObj),
    //     httpOptions
    // ).subscribe(
    //     data => {
    //       // TODO insert ngx-toastr Message
    //       console.log('the post request was successfully done', data);
    //     },
    //     error => {
    //       // TODO insert ngx-toastr Message
    //       console.log('there error from fetching the data', error);
    //     },
    //     () => {
    //       // If Success Navigate to Admin Dashboard Page
    //       this.router.navigate(['../'], {relativeTo: this.route});
    //     }
    // );

  /***** Uploadin Multi Images
     // const formData: FormData = new FormData();
     // for (let i = 0; i < (this.myFiles.length); i++) {
    // formData.append('path', this.myFiles, this.myFiles.name);
    // }
     // formData.append('media', this.uploadForm.get('media').value);
     // formData.append('entity', this.uploadForm.get('entity').value);
     // formData.append('row', this.uploadForm.get('row').value);
     // formData.append('name', this.uploadForm.get('name').value);
     // formData.forEach((value, key) => {
    //   this.options[key] = value;
    // });
     // console.log(this.options);
     // this.httpClient.post<any>('http://localhost:1337/localhost:8000/createMedia', this.options).subscribe(
     //     (res) => console.log(res),
     //     (err) => console.log(err)
     // );
     ***/
  }
}
