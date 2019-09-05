import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {Artist} from '../../../entity/artist/artist';
import {ArtistService} from '../../../service/artist/artist.service';


@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {
  uploadForm: FormGroup;
  artists: Artist[];
  artTypes: ArtType[];

  constructor(private formBuilder: FormBuilder,
              private photoListService: PhotosListService,
              private artistService: ArtistService,
              private artTypeService: ArtTypeService) {}

  ngOnInit() {
    // Fetch All Artists
    this.artistService.getAllArtists().subscribe(
    (data) => {
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
            console.log(data);
            this.artTypes = data.Data;
          }
        },
        error => {
          console.log(error);
        }
    );
    // Storing From Data
    this.uploadForm = this.formBuilder.group({
      name: [''],
      artist: [''],
      height: [''],
      width: [''],
      colorsType: [''],
      price: [''],
      state: [''],
      story: [''],
      image: [''],
      // TODO tey it with radiobox
      active: [''],
      createdBy: [''],
      updatedBy: [''],
      createDate: [''],
      updateDate: [''],
      artType: [''],
      gallery: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0].name;
      this.uploadForm.get('image').setValue(file);
    }
  }

  mySubmit() {
    // Fetch All Form Data On Json Type
    const formObj = this.uploadForm.getRawValue();
    console.log(formObj);
    this.photoListService.postAddPainting(formObj);
  }


}
