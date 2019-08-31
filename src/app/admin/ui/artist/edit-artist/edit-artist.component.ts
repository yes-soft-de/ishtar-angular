import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ArtistService} from '../../../service/artist/artist.service';
import {ArtistInterface} from '../../../entity/artist/artist-interface';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {
  artistID: string;
  artistData = {
    id: '',
    name: '',
    nationality: '',
    residence: '',
    birthDate: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    image: '',
    video: '',
    details: '',
    story: ''
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private artist: ArtistService ) { }

  ngOnInit() {
    // Fetch The Artist ID
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.artistID = param.get('id');
    });
    // Fetch The Artist Data Depends On His ID
    this.artist.getArtistByArtist(this.artistID).subscribe(
        data => {
          if (data) {
            this.artistData.id = `${data.id}`;
            this.artistData.name = data.name;
            this.artistData.nationality = data.nationality;
            this.artistData.residence = data.residence;
            this.artistData.birthDate = data.birthDate;
            this.artistData.facebook = data.facebook;
            this.artistData.instagram = data.instagram;
            this.artistData.linkedin = data.linkedin;
            this.artistData.twitter = data.twitter;
            this.artistData.image = data.image;
            this.artistData.video = data.video;
            this.artistData.details = data.details;
            this.artistData.story = data.story;
            console.log(this.artistData);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  // Save THe Data After Update It
  myEditSubmit(form) {
      this.artist.updateArtist(this.artistID, form.value).subscribe(
          (data: ArtistInterface) => {
            console.log('request successfully', data);
          },
          error => {
            console.log(error);
          },
          () => {
            this.router.navigate(['admin/list-artist']);
          }
      );
  }
}
