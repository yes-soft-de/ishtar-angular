import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Artist} from '../../../entity/artist/artist';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {StatueService} from '../../../service/statue/statue.service';
import {ArtistListResponse} from '../../../entity/ArtistList/artist-list-response';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ArtistInterface} from '../../../entity/artist/artist-interface';


@Component({
  selector: 'app-add-statue',
  templateUrl: './add-statue.component.html',
  styleUrls: ['./add-statue.component.scss']
})
export class AddStatueComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: ArtistInterface[];
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private statueService: StatueService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    // Fetch All Artists
    this.artistService.getAllArtists().subscribe(
      (data) => {
        if (data) {
          console.log('artist in admin:', data);
          this.artists = data.Data;
        }
      });

    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      artist: ['', [Validators.required]],
      height: ['', Validators.required],
      width: ['', Validators.required],
      weight: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      length: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      price: ['', Validators.required],
      state: ['', Validators.required],
      image: [''],
      // TODO tey it with radio box
      active: ['', Validators.required],
      keyWords: ['', [Validators.required, Validators.minLength(2)]],
      material: ['', [Validators.required, Validators.minLength(2)]],
      style: ['', [Validators.required, Validators.minLength(2)]],
      period: ['', [Validators.required, Validators.minLength(4)]],
      mediums: ['', [Validators.required, Validators.minLength(4)]],
      features: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  // Getter method to fast access formControls
  get artist() {
    return this.uploadForm.get('artist');
  }

  // Choose Artist using select dropdown
  changeArtist(event) {
    this.artist.setValue(event.target.value, {
      onlySelf: true
    });
  }
  // Choose State Using Select Dropdown
  changeState(event) {
    this.uploadForm.get('state').setValue(event.target.value, {
      onlySelf : true
    });
  }
  // Choose State Using Select Dropdown
  changeActive(event) {
    this.uploadForm.get('active').setValue(event.target.value, {
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

  processFile(imageInput: any) {
    this.fileSelected = false;
    this.uploadButtonValue = 'Uploading...';
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.statueService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            console.log(res);
            this.imageUrl = res.url;
            this.uploadButtonValue = 'Uploaded';
            this.imagePathReady = true;
            this.submitButtonValue = 'Add New Statue';
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
      this.toaster.error(`Error: All Fields Are Required`);
      return false;
    } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.statueService.postAddStatue(formObj).subscribe(
          data => {
            this.toaster.success('Statue Was Successfully Added');
            console.log('the post request was successfully done', data);
          },
          error => {
            console.log('There error from fetching the data', error);
            this.toaster.error('Error : Statue Not Uploaded Successfully');
          },
          () => {
            // If Success Navigate to Admin List Paintings Page
            this.router.navigate(['admin/list-statues']);
          }
      );
    }
  }

}
