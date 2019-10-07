import {Component, OnInit} from '@angular/core';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';

@Component({
  selector: 'app-artist-details-page',
  templateUrl: './artist-details-page.component.html',
  styleUrls: ['./artist-details-page.component.scss']
})
export class ArtistDetailsPageComponent implements OnInit {
  artist: ArtistDetails;
  paintingList: PaintingListItem[] = null;

  constructor(private artistService: UserArtistService, private activatedRoute: ActivatedRoute,
              private photoService: PaintingListService) {
  }

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.artistService.requestArtistDetails(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.artist = data.Data[0];
      }, error1 => {
        console.log('Retrying');
        // this.fetchData();
      }
    );

    this.photoService.requestPaintingListByArtist(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.paintingList = data.Data;
        }, error1 => {
          console.log('Retrying');
          // this.fetchData();
        }
      );
  }


}
