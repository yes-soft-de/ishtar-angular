import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtTypeResponse} from '../../../entity/art-type/art-type-response';
import {ArtType} from '../../../entity/art-type/art-type';
import {ArtTypeService} from '../../../service/art-type/art-type.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PhotosListService} from '../../../service/PhotosList/photos-list.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ImageSnippet} from '../../../entity/image-snippet/image-snippet';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  artTypes: ArtType[];
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Waiting Uploading Image';
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
          console.log(data);
        }
      },
      error => {
        console.log(error);
      }
    );
    // Fetch Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      nationality: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      residence: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      birthDate: ['', Validators.required],
      Facebook: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Instagram: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Linkedin: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Twitter: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      artType: ['', [Validators.required]],
      image: [''],
      // video: [''],
      details: ['', [Validators.required, Validators.minLength(2)]],
      story: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  // Choose Art Type Using Select Dropdown
  changeArtType(event) {
    this.uploadForm.get('artType').setValue(event.target.value, {
      onlySelf: true
    });
  }

  updateName(imageInput: any) {
    const file: File = imageInput.files[0];
    this.uploadButtonValue = 'Upload';
    this.imageName = file.name;
    this.fileSelected = true;
  }

  processFile(imageInput: any) {
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
          this.submitButtonValue = 'Add New Artist';
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
      this.toaster.error('Error : Form Not Valid');
      return false;
    } else {
      // Fetch All Form Data On Json Type
      const formObj = this.uploadForm.getRawValue();
      formObj.image = this.imageUrl;
      console.log(formObj);
      this.artistService.postAddArtist(formObj).subscribe(
        data => {
          console.log('The post request was successfully done', data);
          this.toaster.success('Artist Uploaded');
        },
        error => {
          this.toaster.error('Error : Artist Not Uploaded Successfully');
          console.log(error);
        },
        () => {
          this.router.navigate(['admin/list-artists']);
        }
      );
    }
  }


}
