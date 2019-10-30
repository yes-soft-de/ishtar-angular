import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArtType} from '../../../entity/art-type/art-type';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {HttpClient} from '@angular/common/http';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {ToastrService} from 'ngx-toastr';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {map, mergeMap} from 'rxjs/operators';
import {ArtistListItem} from '../../../../user/entity/artist-list/artist-list-item';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {
  artistId: number;
  isSubmitted = false;
  uploadForm: FormGroup;
  artistData: ArtistListItem;
  artTypes: ArtType[];
  artTypeId: number;
  uploadButtonValue = 'Upload';
  imageName = 'Leave it if you don\'t want to change image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = true;
  submitButtonValue = 'Update Artist';
  selectedFile: ImageSnippet;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private artistService: ArtistService,
              private artTypeService: ArtTypeService,
              private photoListService: PhotosListService,
              private router: Router,
              private toaster: ToastrService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // fetch artist id using observable
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.artistId = +params.get('id');
    });
    const allArtistsObs = this.artistService.getAllArtists();   // Fetch All Artist
    const allArtTypeObs = this.artTypeService.getAllArtType();  // Fetch All ArtType
    // Merge The Two Observable In One
    const mergeObs = allArtistsObs.pipe(
      mergeMap(artistResponse => {
        return allArtTypeObs.pipe(
            map(artTypeResponse => {
              return {
                artists: artistResponse,
                artTypes: artTypeResponse
              };
            })
        );
      })
    );
    // Subscribe Data After Merge it
    mergeObs.subscribe(
      (data: {artists: any, artTypes: any}) => {
        // fetch all art type
        this.artTypes = data.artTypes.Data;
        // select the artist for this route
        data.artists.Data.map(artistRes => {
          if (artistRes.id === this.artistId) {
            this.artistData = artistRes;
          }
        });
        // fetch the artType Id For This Artist
        data.artTypes.Data.map(artTypeRes => {
          if (artTypeRes.name === this.artistData.artType) {
            this.artTypeId = artTypeRes.id;
          }
        });
        console.log(this.artistData, data);
        // setValue = patchValue: Not that setValue wont fail silently. But patchValue will fail silent. It is recommended to use patchValue therefore
        this.uploadForm.setValue({    // Insert Our artist Data Into Form Fields
          id:           this.artTypeId,
          name:         this.artistData.name,
          nationality:  this.artistData.nationality,
          residence:    this.artistData.residence,
          birthDate:    this.artistData.birthDate,
          Facebook:     this.artistData.Facebook,
          Instagram:    this.artistData.Instagram,
          Linkedin:     this.artistData.Linkedin,
          Twitter:      this.artistData.Twitter,
          artType:      this.artTypeId,
          image:        this.artistData.image,
          details:      this.artistData.details,
          story:        this.artistData.story
        });
      }
    );
    // Fetch Form Data
    this.uploadForm = this.formBuilder.group({
      name:         ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      nationality:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      residence:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      birthDate:    ['', Validators.required],
      Facebook:     ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Instagram:    ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Linkedin:     ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      Twitter:      ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      artType:      ['', [Validators.required]],
      image:        [''],
      details:      ['', [Validators.required, Validators.minLength(2)]],
      story:        ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Choose Art Type Using Select Dropdown
  changeArtType(event) {
    this.uploadForm.get('artType').setValue(event.target.value, {
      onlySelf : true
    });
  }

  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadButtonValue = 'Upload';
    this.imageName = file.name;
    this.fileSelected = true;
  }

  processFile(imageInput: any) {
    this.imagePathReady = false;
    this.fileSelected = false;
    this.uploadButtonValue = 'Uploading...';
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.artistService.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
            console.log(res);
            this.imageUrl = res.url;
            this.uploadButtonValue = 'Uploaded';
            this.imagePathReady = true;
            this.submitButtonValue = 'Update Artist';
          },
          (err) => {
            console.log(err);
          });
    });
    reader.readAsDataURL(file);
  }

  mySubmit() {
    console.log('New Image URL:', this.imageUrl);
    this.isSubmitted = true;
    if (!this.uploadForm.valid) {
      this.toaster.error('Error : All Fields Are Required');
      return false;
    } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      if (this.imageUrl) {
        formObj.image = this.imageUrl;
      }
      console.log(formObj);
      this.artistService.updateArtist(this.artistId, formObj).subscribe(
          data => {
            console.log('The post request was successfully done', data);
            this.toaster.success('Artist Uploaded Successfully');
          },
          error => {
            this.toaster.error('Error : Please Try Again');
            console.log('Error fetching data', error);
          },
          () => {
            this.router.navigate(['admin/list-artists']);
          }
      );
    }
  }


}
