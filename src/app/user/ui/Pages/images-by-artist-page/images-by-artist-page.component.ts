import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtistService} from '../../../../admin/service/artist/artist.service';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';

@Component({
  selector: 'app-images-by-artist-page',
  templateUrl: './images-by-artist-page.component.html',
  styleUrls: ['./images-by-artist-page.component.scss']
})
export class ImagesByArtistPageComponent implements OnInit {
  // artistName: string;
  // formattedList: PaintingListItem[];
  //
  constructor(private paintingService: PaintingListService, private activatedRoute: ActivatedRoute,
              private artistService: UserArtistService) {
  }
  ngOnInit() {
  //   this.paintingService.requestPaintingListByArtist(
  //     this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
  //     data => {
  //       this.formattedList = data.Data;
  //     }
  //   );
  //   this.artistService.requestArtistDetails(
  //     this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
  //       data => {
  //         this.artistName = data.name;
  //       }
  //   );
  }

}
