import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient} from '@angular/common/http';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';


@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {
  uploadForm: FormGroup;
  artTypes: ArtType[];

  constructor(private formBuilder: FormBuilder,
              private photoListService: PhotosListService,
              private artTypeService: ArtTypeService,
              private httpClient: HttpClient) {}

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
      active: [''],
      artType: [''],
      gallery: ['']
    });
    console.log(this.uploadForm);
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  }

  mySubmit() {
    const formData = new FormData();
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('artist', this.uploadForm.get('artist').value);
    formData.append('height', this.uploadForm.get('height').value);
    formData.append('width', this.uploadForm.get('width').value);
    formData.append('colorsType', this.uploadForm.get('colorsType').value);
    formData.append('price', this.uploadForm.get('price').value);
    formData.append('state', this.uploadForm.get('state').value);
    formData.append('story', this.uploadForm.get('story').value);
    formData.append('image', this.uploadForm.get('image').value);
    formData.append('active', this.uploadForm.get('active').value);
    formData.append('artType', this.uploadForm.get('artType').value);
    formData.append('gallery', this.uploadForm.get('gallery').value);
    // console.log(formData.value);
    // this.photoListService.postAddPainting(formData);
    this.httpClient.post<any>('url', formData).subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
    );
  }


}
