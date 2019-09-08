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
import {log} from 'util';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-add-painting',
  templateUrl: './add-painting.component.html',
  styleUrls: ['./add-painting.component.scss']
})
export class AddPaintingComponent implements OnInit {
  uploadForm: FormGroup;
  artists: Artist[];
  artTypes: ArtType[];

  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  selectedFile: ImageSnippet;

  constructor(private formBuilder: FormBuilder,
              private photoListService: PhotosListService,
              private artistService: ArtistService,
              private toaster: ToastrService,
              private artTypeService: ArtTypeService,
              private router: Router) {
  }

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
      // TODO tey it with radio box
      active: [''],
      keyWords: [''],
      artType: [''],
      gallery: [''],
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0].name;
    }
  }

  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imageName = file.name;
    this.fileSelected = true;
  }

  processFile(imageInput: any) {
    console.log('Processing File');
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.photoListService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res);
          this.imageUrl = res.url;
        },
        (err) => {
          console.log(err);
        });
    });

    reader.readAsDataURL(file);
  }

  mySubmit() {
    if (this.isEverythingFilled()) {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(JSON.stringify(formObj));
      this.photoListService.postAddPainting(formObj).subscribe(
        data => {
          // TODO insert ngx-toastr Message
          console.log('the post request was successfully done', data);
        },
        error => {
          // TODO insert ngx-toastr Message
          console.log(`${JSON.stringify(error)}`);
        },
        () => {
          // If Success Navigate to Admin Dashboard Page
          this.router.navigate(['admin/list-paintings']);
        }
      );
    } else {
      this.toaster.error(`Error: ${this.isEverythingFilled()}`);
    }
  }

  isEverythingFilled() {
    if (this.uploadForm.get('name').value.toString().length < 1) {
      return 'name is not filled!';
    }
    if (this.uploadForm.get('height').value.toString().length < 1) {
      return 'height is not filled!';
    }
    if (this.uploadForm.get('width').value.toString().length < 1) {
      return 'width is not filled!';
    }
    if (this.uploadForm.get('colorsType').value.toString().length < 1) {
      return 'colors is not filled!';
    }
    if (this.uploadForm.get('price').value.toString().length < 1) {
      return 'price is not filled!';
    }
    if (this.uploadForm.get('name').value.toString().length < 1) {
      return 'name is not filled!';
    }
    if (this.uploadForm.get('keyWords').value.toString().length < 1) {
      return 'keys is not filled!';
    }
    if (this.uploadForm.get('state').value.toString().length < 1) {
      return 'state is not filled!';
    }
    if (this.uploadForm.get('gallery').value.toString().length < 1) {
      return 'gallery is not filled!';
    }
    if (this.uploadForm.get('active').value.toString().length < 1) {
      return 'active is not filled!';
    }
    if (this.uploadForm.get('story').value.toString().length < 1) {
      return 'story is not filled!';
    }
    if (this.imageUrl.length < 1) {
      return 'file is not Uploaded!';
    }
    return true;
  }

}
