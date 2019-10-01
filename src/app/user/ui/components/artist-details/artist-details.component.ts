import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ToastrService} from 'ngx-toastr';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  @Input() featuredPaintings: PaintingListItem[];
  @Input() artist: ArtistDetails;
  artistMainPainting: PaintingListItem;
  viewData: ViewInterface = {
      entity: 2,      // 2: For Artist Entity
      row: 0,         // this for Artist id
      interaction: 2, // 2: for Follow interaction
      client: 1,      // this for client id
  };
  isFollowed = 'Follow';

  constructor(private activatedRoute: ActivatedRoute,
              private artistPaintings: PaintingListService,
              private artistDetails: UserArtistService,
              private interactionService: IshtarInteractionService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.artistPaintings.requestPaintingListByArtist(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.featuredPaintings = data.Data;
        console.log(this.featuredPaintings);
        const random = `${Math.random() * 100}`;
        const randPainting = parseInt(random, 10) % this.featuredPaintings.length;
        this.artistMainPainting = this.featuredPaintings[randPainting];
        console.log(this.artistMainPainting);
      }, error1 => {
        console.log(error1);
      }
    );
    // Get Artist Paintings
  }

    // Increase view for Artist
    followArtist(id: number) {
      this.viewData.row = id;
      this.interactionService.addViewInteraction(this.viewData).subscribe(
          res => {
            this.isFollowed = 'Followed';
            // console.log('This Artist Was Reviewed', res);
            this.toaster.success('You Are Following Successfully');
          },
          error => {
            console.log(error);
          }
      );
  }
}
