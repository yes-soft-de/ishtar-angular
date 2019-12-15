import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PaintingListResponse} from '../../../entity/PaintingList/painting-list-response';
import {Painting} from '../../../entity/painting/painting';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminConfig} from '../../../AdminConfig';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ArtistService} from '../../../service/artist/artist.service';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  paintings: Painting[];
  entityID: number;
  Entity: any = ['Painting', 'Artist', 'ArtType', 'Auction', 'Client', 'Statue'];
  rowEntity: {Data: any[]};
  rowActive = true;
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private photosListService: PhotosListService,
              private artistService: ArtistService,
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
      media: ['', Validators.required],
      entity: ['', Validators.required],
      row: [{value: '', disabled: this.rowActive}, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      image: ['']
    });
  }

  onFileSelect(event) {
    /******
    // Uploading Multi Images
    // if (event.target.files.length > 0) {
    //   for (let i = 0; i < (event.target.files.length); i++) {
    //     this.file = event.target.files[i];
    //     this.myFiles.push(event.target.files[i]);
    //     this.uploadForm.get('image').setValue(this.myFiles);
    //   }
    // }
  *****/
  }

  // Choose Media Using Select Dropdown
  changeMedia(event) {
    this.uploadForm.get('media').setValue(event.target.value, {
      onlySelf : true
    });
  }
  // Choose Row Using Select Dropdown
  changeRow(event) {
    this.uploadForm.get('row').setValue(event.target.value, {
      onlySelf: true
    });
  }
  // Choose Entity Using Select Dropdown
  changeEntity(event) {
    // Disable the row dropdown until fetching the rowEntity data
    this.uploadForm.get('row').disable();
    this.entityID = event.target.value[0];
    const entityName = event.target.value.slice(3);
    console.log(event.target.value, this.entityID, entityName);
    this.uploadForm.get('entity').setValue(event.target.value, {
      onlySelf : true
    });
    // fetch the All Rows For this Entity
    this.httpClient.get(`${AdminConfig.allRowSelectedEntityAPI}/${entityName}`).subscribe(
        (data: {Data: any}) => {
          if (entityName === 'Auction') {
            this.uploadForm.get('row').disable();
            return;
          }
          this.rowEntity = data.Data;
          this.uploadForm.get('row').enable();
          // this.rowActive = false;
          console.log('Row Entity: ', this.rowEntity);
      },
      error => {
        this.uploadForm.get('row').disable();
        console.log('Error Fetch Row Entity : ', error);
      }
    );
  }

  // Get Image Name And Active Upload Button
  updateName(imageInput: any) {
   const file = imageInput.files[0];
   this.uploadButtonValue = 'Upload';
   this.imageName = file.name;    // Display Image Name
   this.fileSelected = true;      // Active Upload Button
  }

  // Uploading THe File
  processFile(imageInput: any) {
    let imageUploadApiMethod: any;
    // tslint:disable-next-line:triple-equals
    imageUploadApiMethod = this.entityID == 1 ? this.photosListService : this.artistService;
    this.fileSelected = false;
    this.uploadButtonValue = 'Uploading...';
    console.log('Progressing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      imageUploadApiMethod.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          this.imageUrl = res.url;
          this.uploadButtonValue = 'Uploaded';
          this.imagePathReady = true;
          this.submitButtonValue = 'Add New Media';
        },
        (err) => {
          console.log(err);
        });
    });
    reader.readAsDataURL(file);
  }

  // On Submit The Form
  mySubmit() {
    this.isSubmitted = true;
    if (!this.uploadForm.valid) {
      this.toast.error('Error : Form Not Valid');
      return false;
    } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.entity = this.entityID;
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.httpClient.post(
          `${AdminConfig.addMediaAPI}`,
          JSON.stringify(formObj)
      ).subscribe(
          data => {
            this.toast.success('Media Was Successfully Added');
            console.log('Post request was successfully done', data);
          },
          error => {
            console.log('there error from fetching the data', error);
            this.toast.error('Error: Media Not Uploaded Successfully');
          },
          () => {
            // If Success Navigate to Admin Dashboard Page
            this.router.navigate(['../'], {relativeTo: this.route});
          }
      );
    }
  }
}
