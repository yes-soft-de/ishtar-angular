import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Artist} from '../../../entity/artist/artist';
import {ArtType} from '../../../entity/art-type/art-type';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {ArtistService} from '../../../service/artist/artist.service';
import {ToastrService} from 'ngx-toastr';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistListResponse} from '../../../entity/ArtistList/artist-list-response';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {StatueService} from '../../../service/statue/statue.service';
import {map, mergeMap} from 'rxjs/operators';
import {StatueInterface} from '../../../entity/statue/statue.interface';

@Component({
  selector: 'app-edit-statue',
  templateUrl: './edit-statue.component.html',
  styleUrls: ['./edit-statue.component.scss']
})
export class EditStatueComponent implements OnInit {
  statuesData: {0: StatueInterface, price: string};
  statueId: number;
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: Artist[];
  artistId: number;
  uploadButtonValue = 'Upload';
  imageName = 'Leave it if you don\'t want to change image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = true;
  submitButtonValue = 'Waiting Uploading Image';
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private statueService: StatueService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Fetch Statue Id Using Observable
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.statueId = +params.get('id');
    });
    const allStatuesObs = this.statueService.getAllStatues();   // Fetch All Statues
    const allArtistObs = this.artistService.getAllArtists();    // Fetch All Artists
    const mergeObservable = allStatuesObs.pipe(                 // Merge Observable Request
        mergeMap(statuesResponse => {
          return allArtistObs.pipe(
              map(artistsResponse => {
                return {
                  statues: statuesResponse,
                  artists: artistsResponse
                };
              })
          );
        })
    );
    // Subscribe To Fetch Data
    mergeObservable.subscribe((data: {statues: any, artists: any}) => {
      // fetch all Artists
      this.artists = data.artists.Data;
      // select the statue for this route
      data.statues.Data.map(statuesRes => {
        if (statuesRes['0'].id === this.statueId) {
          this.statuesData = statuesRes;
        }
      });
      // fetch the artists Id For This Statue
      data.artists.Data.map(artistRes => {
        if (artistRes.name === this.statuesData['0'].artist) {
          this.artistId = artistRes.id;
        }
      });
      console.log(this.statuesData, data);
        /* setValue = patchValue: Not that setValue wont fail silently. But patchValue will fail silent.
        It is recommended to use patchValue therefore
       */
      this.uploadForm.patchValue({  // Insert Our Statues Data Into Form Fields
        name:         this.statuesData['0'].name,
        artist:       this.artistId,
        height:       this.statuesData['0'].height,
        width:        this.statuesData['0'].width,
        weight:       this.statuesData['0'].weight,
        price:        this.statuesData.price,
        state:        this.statuesData['0'].state,
        image:        this.statuesData['0'].image,
        active:       this.statuesData['0'].active,
        keyWords:     this.statuesData['0'].keyWord,
        material:     this.statuesData['0'].material,
        style:        this.statuesData['0'].style,
        period:       this.statuesData['0'].period,
        mediums:      this.statuesData['0'].mediums,
        features:     this.statuesData['0'].features,
        description:  this.statuesData['0'].description,
      });
    });

    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      artist: ['', [Validators.required]],
      height: ['', Validators.required],
      width: ['', Validators.required],
      weight: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
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
    this.imagePathReady = false;
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
            this.submitButtonValue = 'Update Statue';
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
      if (this.imageUrl) {
        formObj.image = this.imageUrl;
      }
      console.log(formObj);
      this.statueService.updateStatue(this.statueId, formObj).subscribe(
          data => {
            this.toaster.success('Statue Update Successfully');
            console.log('the request was successfully done', data);
          },
          error => {
            console.log('There error from fetching the data', error);
            this.toaster.error('Error : Please Try Again');
          },
          () => {
            // If Success Navigate to Admin List Paintings Page
            this.router.navigate(['admin/list-statues']);
          }
      );
    }
  }

}
