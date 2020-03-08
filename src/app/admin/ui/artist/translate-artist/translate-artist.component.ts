import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImageSnippet } from 'src/app/admin/entity/image-snippet/image-snippet';
import { TranslateArtistService } from 'src/app/admin/service/artist/translate-artist.service';

@Component({
  selector: 'app-translate-artist',
  templateUrl: './translate-artist.component.html',
  styleUrls: ['./translate-artist.component.scss']
})
export class TranslateArtistComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  uploadButtonValue = 'Upload';
  imageName = 'Select Image';
  fileSelected = false;
  fileUploaded = false;
  imageUrl: string;
  imagePathReady = false;
  submitButtonValue = 'Submit Translation';
  selectedFile: ImageSnippet;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateArtistService
  ) {
  }

  ngOnInit() {
    // Fetch Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      nationality: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      residence: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      details: ['', [Validators.required, Validators.minLength(2)]],
      story: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  mySubmit() {
    this.translate.postTranslation(this.uploadForm.getRawValue()).subscribe(
      () => {
        console.log('Post Success');
      }, err => {
        console.log('error: ' + err);
      }
    );
  }
}
