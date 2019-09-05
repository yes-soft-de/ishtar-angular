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
  options: { content: FormData };
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
    formData.append('name', JSON.stringify(this.uploadForm.get('name').value));
    formData.append('artist', JSON.stringify(this.uploadForm.get('artist').value));
    formData.append('height', JSON.stringify(this.uploadForm.get('height').value));
    formData.append('width', JSON.stringify(this.uploadForm.get('width').value));
    formData.append('colorsType', JSON.stringify(this.uploadForm.get('colorsType').value));
    formData.append('price', JSON.stringify(this.uploadForm.get('price').value));
    formData.append('state', JSON.stringify(this.uploadForm.get('state').value));
    formData.append('story', JSON.stringify(this.uploadForm.get('story').value));
    formData.append('createdBy', JSON.stringify(this.uploadForm.get('createdBy').value));
    formData.append('updatedBy', JSON.stringify(this.uploadForm.get('updatedBy').value));
    formData.append('createDate', JSON.stringify(this.uploadForm.get('createDate').value));
    formData.append('updateDate', JSON.stringify(this.uploadForm.get('updateDate').value));
    formData.append('image', JSON.stringify(this.uploadForm.get('image').value, this.uploadForm.get('image').value.name));
    formData.append('active', JSON.stringify(this.uploadForm.get('active').value));
    formData.append('artType', JSON.stringify(this.uploadForm.get('artType').value));
    this.options = {content: formData};
    console.log(this.options);
    // this.httpClient.post('http://localhost:1337/localhost:8000/createPainting', this.options).subscribe(
    //     (res) => console.log('talal successfully', res),
    //     (error) => console.log('talal errors : ', error)
    // );
  }


}
