import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {Artist} from '../../../entity/artist/artist';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ArtistListResponse} from '../../../entity/ArtistList/artist-list-response';
import {ArtistInterface} from '../../../entity/artist/artist-interface';


@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: ArtistInterface[];
  artTypes: ArtType[];
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private photosListService: PhotosListService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private artTypeService: ArtTypeService,
              private router: Router) {
  }

  ngOnInit() {
    // Fetch All Artists
    this.artistService.getAllArtists().subscribe(
        (data: ArtistListResponse) => {
          if (data) {
            this.artists = data.Data;
          }
        }, error => {
          // TODO think if there is some to do here ex : display message if there is error
          console.log('Error :', error);
        });
    // Fetch All Art Type
    this.artTypeService.getAllArtType().subscribe(
        (data: ArtTypeResponse) => {
          if (data) {
            this.artTypes = data.Data;
          }
        },
        error => {
          console.log(error);
        }
    );
    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      artist: ['', [Validators.required]],
      height: ['', Validators.required],
      width: ['', Validators.required],
      colorsType: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      price: ['', Validators.required],
      state: ['', Validators.required],
      image: [''],
      location: ['', Validators.required],
      // TODO tey it with radio box
      active: ['', Validators.required],
      keyWords: ['', [Validators.required, Validators.minLength(2)]],
      artType: ['', Validators.required],
      // gallery: ['', Validators.required],
      story: ['', [Validators.required, Validators.minLength(4)]],
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
  // Choose Art Type Using Select Dropdown
  changeArtType(event) {
    this.uploadForm.get('artType').setValue(event.target.value, {
      onlySelf : true
    });
  }
  // Choose Gallery Using Select Dropdown
  changeGallery(event) {
    this.uploadForm.get('gallery').setValue(event.target.value, {
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
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.photosListService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            console.log(res);
            this.imageUrl = res.url;
            this.uploadButtonValue = 'Uploaded';
            this.imagePathReady = true;
            this.submitButtonValue = 'Add New Painting';
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
      this.photosListService.postAddPainting(formObj).subscribe(
          data => {
            this.toaster.success('Painting Was Successfully Added');
            console.log('the post request was successfully done', data);
          },
          error => {
            console.log('There error from fetching the data', error);
            this.toaster.error('Error : Painting Not Uploaded Successfully');
          },
          () => {
            // If Success Navigate to Admin List Paintings Page
            this.router.navigate(['list-paintings']);
          }
      );
    }
  }
}
