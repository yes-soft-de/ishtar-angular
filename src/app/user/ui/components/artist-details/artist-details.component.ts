import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {ArtistDetails} from '../../../entity/artist/artist-details';
import {PaintingListService} from '../../../service/painting-list/painting-list.service';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
    @Input() featuredPaintings: PaintingListItem[]; // Fetch All Painting
    @Input() artist: ArtistDetails;
    artistMainPainting: PaintingListItem;
    paintingSlides: any = [[]];             // For Storing Paintings and separate it to 4 pieces

  constructor(private userProfileService: UserProfileService,
              private activatedRoute: ActivatedRoute,
              private artistPaintings: PaintingListService) {
  }

  ngOnInit() {
    this.artistPaintings.requestPaintingListByArtist(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.featuredPaintings = data.Data;
        // Chunk the painting array to 4 pieces to use it inside carousel
        this.paintingSlides = this.chunk(this.featuredPaintings, 4);
        const random = `${Math.random() * 100}`;
        const randPainting = parseInt(random, 10) % this.featuredPaintings.length;
        this.artistMainPainting = this.featuredPaintings[randPainting];
        console.log(this.artistMainPainting);
      }, error1 => {
        console.log(error1);
      }
    );
    }

    chunk(paintingsArr, chunkSize) {
        const arr = [];
        for (let i = 0, len = paintingsArr.length; i < len; i += chunkSize) {
            arr.push(paintingsArr.slice(i, i + chunkSize));
            console.log('slice: ', arr, arr.slice(i, i + chunkSize));
        }
        return arr;
    }


}
