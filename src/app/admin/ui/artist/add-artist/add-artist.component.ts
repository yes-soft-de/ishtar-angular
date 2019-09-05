import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  uploadForm: FormGroup;
  artTypes: ArtType[];

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private artistService: ArtistService,
              private artTypeService: ArtTypeService) {
  }

  ngOnInit() {
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
    // Fetch Form Data
    this.uploadForm = this.formBuilder.group({
      name: [''],
      nationality: [''],
      residence: [''],
      birthDate: [''],
      facebook: [''],
      instagram: [''],
      linkedin: [''],
      twitter: [''],
      artType: [''],
      image: [''],
      // video: [''],
      details: [''],
      story: ['']
    });
  }

  // On Select Image to Upload

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0].name;
      this.uploadForm.get('image').setValue(file);
    }
  }

  mySubmit() {
    // Fetch All Form Data On Json Type
    const formObj = this.uploadForm.getRawValue();
    this.artistService.postAddArtist(formObj);
  }


}
