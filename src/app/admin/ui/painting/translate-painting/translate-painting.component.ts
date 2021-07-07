import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PhotosListService } from '../../../service/PhotosList/photos-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageSnippet } from '../../../entity/image-snippet/image-snippet';
import { ToastrService } from 'ngx-toastr';
import { ArtistInterface } from '../../../entity/artist/artist-interface';
import { PaintingDetailsResponse } from '../../../../user/painting/response/painting-details-response';
import { PaintingDetails } from '../../../../user/painting/entity/painting-details';
import { ArtTypeListItem } from '../../../../user/art-type/entity/art-type-list-item';
import { TranslatePaintingService } from 'src/app/admin/service/PhotosList/translate-painting.service';


@Component({
  selector: 'app-translate-painting',
  templateUrl: './translate-painting.component.html',
  styleUrls: ['./translate-painting.component.scss']
})
export class TranslatePaintingComponent implements OnInit {

  paintingID: number;
  paintingData: PaintingDetails;
  uploadForm: FormGroup;
  artists: ArtistInterface[];
  artTypes: ArtTypeListItem[];
  artistId: number;
  submitButtonValue = 'Submit Painting Translation';

  constructor(private formBuilder: FormBuilder,
              private photosListService: PhotosListService,
              private translationService: TranslatePaintingService,
              private toaster: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // Fetch Painting Id
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.paintingID = Number(param.get('id'));
    });

    // Fetch Painting Data
    this.photosListService.getPaintingInfo(this.paintingID).subscribe(
      (paintingResult: PaintingDetailsResponse) => {
        if (paintingResult) {
          this.paintingData = paintingResult.Data;
          console.log(JSON.stringify(this.paintingData));
          this.artistId = this.paintingData.artistID;
        }
      }
    );

    // Storing Form Data
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      keyWords: ['', [Validators.required, Validators.minLength(2)]],
      story: ['', [Validators.required, Validators.minLength(4)]],
      artType: ['', [Validators.required, Validators.minLength(4)]],
      artist: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  mySubmit() {
    this.translationService.postTranslation({
      name: this.uploadForm.get('name').value,
      keyWords: this.uploadForm.get('keyWords').value,
      story: this.uploadForm.get('story').value,
      artist: this.uploadForm.get('artist').value,
      artType: this.uploadForm.get('artType').value,
      originID: this.paintingData.id
    }).subscribe(
      () => {
        console.log('Translation Post Success!');
        this.router.navigate(['/admin/list-paintings']);
      }, err => {
        console.log('Translation Post Error :( ' + err);
      }
    );
  }
}
