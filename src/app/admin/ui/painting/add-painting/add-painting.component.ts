import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {PaintingInterface} from '../../../entity/painting/painting-interface';


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
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  }

  mySubmit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const formData: FormData = new FormData();
    // formData.append('id', this.uploadForm.get('id').value);
    formData.append('name', this.uploadForm.get('name').value);
    formData.append('artist', this.uploadForm.get('artist').value);
    formData.append('height', this.uploadForm.get('height').value);
    formData.append('width', this.uploadForm.get('width').value);
    formData.append('colorsType', this.uploadForm.get('colorsType').value);
    formData.append('price', this.uploadForm.get('price').value);
    formData.append('state', this.uploadForm.get('state').value);
    formData.append('story', this.uploadForm.get('story').value);
    formData.append('createdBy', this.uploadForm.get('createdBy').value);
    formData.append('updatedBy', this.uploadForm.get('updatedBy').value);
    formData.append('createDate', this.uploadForm.get('createDate').value);
    formData.append('updateDate', this.uploadForm.get('updateDate').value);
    formData.append('image', this.uploadForm.get('image').value, this.uploadForm.get('image').value.name);
    formData.append('active', this.uploadForm.get('active').value);
    formData.append('artType', this.uploadForm.get('artType').value);
    console.log(JSON.stringify(formData));
    // this.httpClient.post('http://localhost:1337/localhost:8000/createPainting', JSON.stringify(formData)).subscribe(
    //     (res) => console.log('talal successfully', res),
    //     (error) => console.log('talal errors : ', error)
    // );
  }


}
