import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import {PaintingDetailsResponse} from '../../../../user/painting/response/painting-details-response';
import {PaintingDetails} from '../../../../user/painting/entity/painting-details';
import {ArtistListResponse} from '../../../entity/ArtistList/artist-list-response';
import {ArtTypeListResponse} from '../../../../user/art-type/response/art-type-list-response';
import {ArtTypeListItem} from '../../../../user/art-type/entity/art-type-list-item';


@Component({
  selector: 'app-edit-painting',
  templateUrl: './edit-painting.component.html',
  styleUrls: ['./edit-painting.component.scss']
})
export class EditPaintingComponent implements OnInit {
  paintingID: number;
  paintingData: PaintingDetails;
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: ArtistInterface[];
  artTypes: ArtTypeListItem[];
  artistId: number;
  artTypeId: number;
  uploadButtonValue = 'Upload';
  imageName = 'Leave it if you don\'t want to change image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = true;
  submitButtonValue = 'Update Painting';
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private photosListService: PhotosListService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private artTypeService: ArtTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // Fetch Painting Id
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.paintingID = Number(param.get('id'));
    });

    // Fetch Painting Data
    this.photosListService.getPaintingInfo(this.paintingID).subscribe(
      (paintingResult: PaintingDetailsResponse) => {
        if (paintingResult) {
          this.paintingData = paintingResult.Data;
          console.log(JSON.stringify(this.paintingData));
          this.artistId = this.paintingData.artistID;
          this.updateArtType();
          this.updatesValues();
        }
      }
    );

    this.artistService.getAllArtists().subscribe(
      (artistListResponse: ArtistListResponse) => {
        this.artists = artistListResponse.Data;

        this.updatesValues();
      }
    );

    this.artTypeService.getAllArtType().subscribe(
      (artTypeListResponse: ArtTypeListResponse) => {
        this.artTypes = artTypeListResponse.Data;

        this.updateArtType();
        this.updatesValues();
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
      location: ['', Validators.required],
      image: [''],
      // TODO tey it with radio box
      active: ['', Validators.required],
      keyWords: ['', [Validators.required, Validators.minLength(2)]],
      artType: ['', Validators.required],
      // gallery: ['', Validators.required],
      story: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  updatesValues() {
    // setValue = patchValue: Not that setValue wont fail silently.
    // But patchValue will fail silent. It is recommended to use patchValue therefore
    this.uploadForm.patchValue({  // insert input value into the form input
      name: this.paintingData.name,
      artist: this.artistId,
      height: this.paintingData.height,
      width: this.paintingData.width,
      colorsType: this.paintingData.colorsType,
      price: this.paintingData.price,
      state: +this.paintingData.state,
      image: this.paintingData.image,
      location: this.paintingData.location,
      active: +this.paintingData.active,
      keyWords: this.paintingData.keyWords,
      artType: this.artTypeId,
      gallery: '1',
      story: this.paintingData.story
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

  updateArtType() {
    console.log('Trying to Update Art Type, ');
    if (this.paintingData.artType && this.artTypes ) {
      for (const artType of this.artTypes) {
        if (artType.name === this.paintingData.artType) {
          this.artTypeId = artType.id;
          console.log(`Trying ${artType.name} == ${this.paintingData.artType}`);
        }
        console.log(`Trying ${artType.name} != ${this.paintingData.artType}`);
      }
    }
  }

  // Choose State Using Select Dropdown
  changeState(event) {
    this.uploadForm.get('state').setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Choose Art Type Using Select Dropdown
  changeArtType(event) {
    this.uploadForm.get('artType').setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Choose Gallery Using Select Dropdown
  changeGallery(event) {
    this.uploadForm.get('gallery').setValue(event.target.value, {
      onlySelf: true
    });
  }

  // Choose State Using Select Dropdown
  changeActive(event) {
    this.uploadForm.get('active').setValue(event.target.value, {
      onlySelf: true
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
      this.photosListService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          this.imageUrl = res.url;
          this.uploadButtonValue = 'Uploaded';
          this.imagePathReady = true;
          this.submitButtonValue = 'Update Painting';
        });
    });
    reader.readAsDataURL(file);
  }

  mySubmit() {
    console.log('New Image URL:', this.imageUrl);
    this.isSubmitted = true;
    if (!this.uploadForm.valid) {
      this.toaster.error(`Error: All Fields Are Required`);
      return false;
    } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      if (this.imageUrl) {
        formObj.image = this.imageUrl;
      }
      console.log('before update', this.paintingID, formObj);
      this.photosListService.updatePainting(this.paintingID, formObj).subscribe(
        data => {
          this.toaster.success('Painting Updated Successfully');
          console.log('the post request was successfully done', data);
        },
        error => {
          console.log('Error fetching data', error);
          this.toaster.error('Error : Please Try Again');
        },
        () => {
          // If Success Navigate to Admin List Paintings Page
          this.router.navigate(['list-paintings']);
        }
      );
    }
  }
}
