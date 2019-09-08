import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}


@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  uploadForm: FormGroup;
  artTypes: ArtType[];


  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  selectedFile: ImageSnippet;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private artistService: ArtistService,
              private artTypeService: ArtTypeService,
              private photoListService: PhotosListService,
              private router: Router,
              private toaster: ToastrService) {
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
      Facebook: [''],
      Instagram: [''],
      Linkedin: [''],
      Twitter: [''],
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

  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.imageName = file.name;
    this.fileSelected = true;
    console.log(this.imageName, this.fileSelected);
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

  isEverythingFilled() {
    if (this.uploadForm.get('name').value.toString().length < 1) {
      return 'name is not filled!';
    }
    if (this.uploadForm.get('nationality').value.toString().length < 1) {
      return 'nationality is not filled!';
    }
    if (this.uploadForm.get('residence').value.toString().length < 1) {
      return 'residence is not filled!';
    }
    if (this.uploadForm.get('birthDate').value.toString().length < 1) {
      return 'birthDate is not filled!';
    }
    if (this.uploadForm.get('Facebook').value.toString().length < 1) {
      return 'Facebook is not filled!';
    }
    if (this.uploadForm.get('Instagram').value.toString().length < 1) {
      return 'Instagram is not filled!';
    }
    if (this.uploadForm.get('Linkedin').value.toString().length < 1) {
      return 'Linkedin is not filled!';
    }
    if (this.uploadForm.get('Twitter').value.toString().length < 1) {
      return 'Twitter is not filled!';
    }
    if (this.uploadForm.get('artType').value.toString().length < 1) {
      return 'artType is not filled!';
    }
    if (this.uploadForm.get('details').value.toString().length < 1) {
      return 'details is not filled!';
    }
    if (this.uploadForm.get('story').value.toString().length < 1) {
      return 'story is not filled!';
    }
    if (this.imageUrl.length < 1) {
      return 'file is not Uploaded!';
    }
    return true;
  }

  mySubmit() {
    if (this.isEverythingFilled() === true) {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(JSON.stringify(formObj));
      this.artistService.postAddArtist(formObj).subscribe(
        data => {
          // TODO insert ngx-toastr Message
          console.log('the post request was successfully done', data);
          this.toaster.success('Artist Uploaded');
          // If Success Navigate to Admin Dashboard Page
        },
        error => {
          // TODO insert ngx-toastr Message
          this.toaster.error('there error from fetching the data', JSON.stringify(error));
        },
        () => {
          // this.router.navigate(['admin/list-artists']);
        }
      );
    } else {
      this.toaster.error(`Error: ${this.isEverythingFilled()}`);
    }
  }


}
