import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {Artist} from '../../../entity/artist/artist';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {from} from 'rxjs';
import {PaintingInterface} from '../../../entity/painting/painting-interface';
import {ArtistInterface} from '../../../entity/artist/artist-interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  options: { content: FormData };
  uploadForm: FormGroup;
  artTypes: ArtType[];
  f: Artist[] = [];
  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private artist: ArtistService,
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
    // Check If Select Image Or Not
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);

    }
  }

  mySubmit() {
    const formData: FormData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('nationality', this.uploadForm.get('nationality').value);
    formData.append('residence', this.uploadForm.get('residence').value);
    formData.append('birthDate', this.uploadForm.get('birthDate').value);
    formData.append('facebook', this.uploadForm.get('facebook').value);
    formData.append('instagram', this.uploadForm.get('instagram').value);
    formData.append('linkedin', this.uploadForm.get('linkedin').value);
    formData.append('twitter', this.uploadForm.get('twitter').value);
    formData.append('artType', this.uploadForm.get('artType').value);
    formData.append('image', this.uploadForm.get('image').value);
    formData.append('details', this.uploadForm.get('details').value);
    formData.append('story', this.uploadForm.get('story').value);
    this.options = {content: formData };
    const form = formData.forEach((value, key) => {
      console.log(key, value);
    });
    this.httpClient.post<ArtistInterface>('http://localhost:1337/localhost:8000/createArtist', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    }).subscribe(
        (res) => console.log('talal successfully', res),
        (error) => console.log('talal errors : ', error)
    );
  }

}
