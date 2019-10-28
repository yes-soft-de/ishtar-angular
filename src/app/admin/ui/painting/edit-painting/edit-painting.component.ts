import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Artist} from '../../../entity/artist/artist';
import {ArtType} from '../../../entity/art-type/art-type';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {forkJoin} from 'rxjs';
import {Painting} from '../../../entity/painting/painting';


@Component({
  selector: 'app-edit-painting',
  templateUrl: './edit-painting.component.html',
  styleUrls: ['./edit-painting.component.scss']
})
export class EditPaintingComponent implements OnInit {
  paintingID: number;
  paintingData: Painting;
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: Artist[];
  artTypes: ArtType[];
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;


  constructor(private formBuilder: FormBuilder,
              private photosListService: PhotosListService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private artTypeService: ArtTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Fetch Painting Id
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.paintingID = Number(param.get('id'));
    });
    const paintingsObs = this.photosListService.getAllPainting(); // Fetch Painting Data
    const artistsObs = this.artistService.getAllArtists();      // Fetch All Artists
    const artTypeObs = this.artTypeService.getAllArtType();     // Fetch All Art Type
    const combinedObs = forkJoin(paintingsObs, artistsObs, artTypeObs);
    combinedObs.subscribe((data: any) => {
      if (data[0]) {
        data[0].Data.map(res => {
          if (res.id === this.paintingID) {
            this.paintingData = res;
          }
        });
      }
      if (data[1]) {
        this.artists = data[1].Data;
      }
      if (data[2]) {
        this.artTypes = data[2].Data;
      }
      console.log(this.paintingData, data);
    });

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
      // TODO tey it with radio box
      active: ['', Validators.required],
      keyWords: ['', [Validators.required, Validators.minLength(2)]],
      artType: ['', Validators.required],
      gallery: ['', Validators.required],
      story: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.uploadForm.patchValue({
      name: this.paintingData.name,
      artist: this.paintingData.artist,
      height: this.paintingData.height,
      width: this.paintingData.width,
      colorsType: this.paintingData.colorsType,
      state: this.paintingData.state,
      image: this.paintingData.image,
      active: this.paintingData.active,
      keyWords: this.paintingData.keyWords,
      artType: this.paintingData.artType,
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
          });
    });
    reader.readAsDataURL(file);
  }

  mySubmit() {
    this.isSubmitted = true;
    // if (!this.uploadForm.valid) {
      // this.toaster.error(`Error: All Fields Are Required`);
      // return false;
    // } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      // this.photosListService.postAddPainting(formObj).subscribe(
      //     data => {
      //       this.toaster.success('Painting Was Successfully Added');
      //       console.log('the post request was successfully done', data);
      //     },
      //     error => {
      //       console.log('There error from fetching the data', error);
      //       this.toaster.error('Error : Painting Not Uploaded Successfully');
      //     },
      //     () => {
      //       // If Success Navigate to Admin List Paintings Page
      //       this.router.navigate(['admin/list-paintings']);
      //     }
      // );
    // }
  }
}
