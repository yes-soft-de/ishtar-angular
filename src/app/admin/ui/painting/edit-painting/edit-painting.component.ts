import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Artist} from '../../../entity/artist/artist';
import {ArtType} from '../../../entity/art-type/art-type';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
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
      // painting response
      if (data[0]) {
        data[0].Data.map(paintingResponse => {
          if (paintingResponse.id === this.paintingID) {
            this.paintingData = paintingResponse;
          }
        });
      }
      // artist response
      if (data[1]) {
        this.artists = data[1].Data;
        // Fetch User ID Automatically
        data[1].Data.map(artistResponse => {
          if (artistResponse.name === this.paintingData.artist) {
            this.artistId = artistResponse.id;
          }
        });
      }
      // artType response
      if (data[2]) {
        this.artTypes = data[2].Data;
        data[2].Data.map(artTypeResponse => {
          if (artTypeResponse.name === this.paintingData.artType) {
            this.artTypeId = artTypeResponse.id;
          }
        });
      }
      console.log(this.paintingData, data);
      // setValue = patchValue: Not that setValue wont fail silently. But patchValue will fail silent. It is recommended to use patchValue therefore
      this.uploadForm.patchValue({  // insert input value into the form input
        id: this.paintingID,
        name: this.paintingData.name,
        artist: this.artistId,
        height: this.paintingData.height,
        width: this.paintingData.width,
        colorsType: this.paintingData.colorsType,
        price: '',
        state: this.paintingData.state,
        image: this.paintingData.image,
        active: this.paintingData.active,
        keyWords: this.paintingData.keyWords,
        artType: this.artTypeId,
        gallery: '',
        story: this.paintingData.story
      });
      // console.log(this.uploadForm.get('artist').value);
    });

    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      id: [''],
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
      console.log(formObj);
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
            this.router.navigate(['admin/list-paintings']);
          }
      );
    }
  }
}
