import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArtistDetails} from '../../entity/artist-details';
import {ArtistService} from '../../service/artist.service';
import {PaintingListItem} from '../../../painting/entity/painting-list-item';
import {Meta, Title} from '@angular/platform-browser';
import {PaintingDetails} from '../../../painting/entity/painting-details';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistDetailsComponent implements OnInit {
  @Input() randomPaintingForArtist: PaintingListItem;
  artist: ArtistDetails;

  linkedInRegex = new RegExp('http(s)?:\\/\\/([w]{3}\\.)?linkedin\\.com\\/in\\/([a-zA-Z0-9-]{5,30})\\/?');
  linkedInValid = false;

  // tslint:disable-next-line:max-line-length
  facebookRegex = new RegExp('(?:(?:http|https):\\/\\/)?(?:www.)?facebook.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?');
  facebookValid = false;

  // tslint:disable-next-line:max-line-length
  twitterRegex = new RegExp('(?:(?:http|https):\\/\\/)?(?:www.)?twitter.com\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[?\\w\\-]*\\/)?(?:profile.php\\?id=(?=\\d.*))?([\\w\\-]*)?');
  twitterValid = false;

  constructor(private activatedRoute: ActivatedRoute,
              private artistService: ArtistService,
              private titleService: Title,
              private meta: Meta) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      urlSegments => {
        this.artistService.getArtist(Number(urlSegments.id)).subscribe(
          artistDetails => {
            this.artist = artistDetails;
            this.setSeo(artistDetails);
            this.linkedInValid = this.linkedInRegex.test(this.artist.Linkedin);
            this.facebookValid = this.facebookRegex.test(this.artist.Facebook);
            this.twitterValid = this.twitterRegex.test(this.artist.Twitter);
          }
        );
      }
    );
  }

  setSeo(artist: ArtistDetails) {
    this.titleService.setTitle(`${artist.name} | Ishtar-Art`);
    this.meta.addTag({ name: 'title', content: `${artist.name} | Ishtar-Art`});
    this.meta.addTag({ name: 'description', content: `${artist.story}`});
  }
}
