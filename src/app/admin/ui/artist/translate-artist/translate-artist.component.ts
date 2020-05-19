import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {TranslateArtistService} from 'src/app/admin/service/artist/translate-artist.service';
import {ArtistService} from '../../../service/artist/artist.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistDetails} from '../../../../user/artist/entity/artist-details';

@Component({
  selector: 'app-translate-artist',
  templateUrl: './translate-artist.component.html',
  styleUrls: ['./translate-artist.component.scss']
})
export class TranslateArtistComponent implements OnInit {
  isSubmitted = false;
  uploadForm: FormGroup;
  submitButtonValue = 'Submit Translation';

  artistId: number;
  artistData: ArtistDetails;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateArtistService,
    private artistService: ArtistService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // Init Form
    this.uploadForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      nationality: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      residence: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      details: ['', [Validators.required, Validators.minLength(2)]],
      artType: ['', [Validators.required, Validators.minLength(2)]],
      story: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.artistId = +params.get('id');
      this.fetchData();
    });
  }

  fetchData() {
    this.artistService.getArtistById(this.artistId).subscribe(
      artistResponse => {
        this.artistData = artistResponse.Data;
      }
    );
  }

  mySubmit() {
    this.translate.postTranslation({
      originID: this.artistId,
      name: this.uploadForm.get('name').value,
      nationality: this.uploadForm.get('nationality').value,
      residence: this.uploadForm.get('residence').value,
      details: this.uploadForm.get('details').value,
      story: this.uploadForm.get('story').value,
      artType: this.uploadForm.get('artType').value
    }).subscribe(
      () => {
        this.router.navigate(['/list-artists']);
      }, err => {
        console.log('error: ' + err);
      }
    );
  }
}
