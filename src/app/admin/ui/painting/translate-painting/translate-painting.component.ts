import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PhotosListService } from '../../../service/PhotosList/photos-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageSnippet } from '../../../entity/image-snippet/image-snippet';
import { ArtistService } from '../../../service/artist/artist.service';
import { ToastrService } from 'ngx-toastr';
import { ArtTypeService } from '../../../service/art-type/art-type.service';
import { ArtistInterface } from '../../../entity/artist/artist-interface';
import { PaintingDetailsResponse } from '../../../../user/painting/response/painting-details-response';
import { PaintingDetails } from '../../../../user/painting/entity/painting-details';
import { ArtistListResponse } from '../../../entity/ArtistList/artist-list-response';
import { ArtTypeListResponse } from '../../../../user/art-type/response/art-type-list-response';
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
  isSubmitted = false;
  uploadForm: FormGroup;
  artists: ArtistInterface[];
  artTypes: ArtTypeListItem[];
  artistId: number;
  artTypeId: number;
  uploadButtonValue = 'Upload';
  imageName = 'Leave it if you don\'t want to change image';
  fileSelected = false;
  imageUrl: string;
  imagePathReady = true;
  submitButtonValue = 'Submit Painting Translation';
  selectedFile: ImageSnippet;

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
    });
  }

  mySubmit() {
    this.translationService.postTranslation({
      name: this.uploadForm.get('name').value,
      keyWords: this.uploadForm.get('keyWords').value,
      story: this.uploadForm.get('story').value
    }).subscribe(
      () => {
        console.log('Translation Post Success!');
      }, err => {
        console.log('Translation Post Error :( ' + err);
      }
    );
  }
}
