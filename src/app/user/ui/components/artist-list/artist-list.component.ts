import {Component, Input, OnInit} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';
import {UserArtistService} from '../../../service/user-artist-service/user-artist.service';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {UserInfo} from '../../../entity/user/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import { InteractionConsts } from 'src/app/user/consts/interaction/interaction-consts';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  @Input() filter = true;
  @Input() artistListFormatted: ArtistListItem[];
  @Input() search = true;
  client: UserInfo;
  public artistList: {
    id: number,
    image: string,
    name: string,
    paintingNumber: number,
    artistFollowers: number
  }[] = [];
  public types: string[] = ['all'];
  public activeArtType: string;
  config: any;  // Config For Paginate
  viewData: ViewInterface = {
    entity: InteractionConsts.ENTITY_TYPE_ARTIST,      // 2: For Artist Entity
    row: 0,         // this for Artist id
    interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
    client: 0,      // this for client id
  };
  artistIDFollow: {
    id: number,
    followNumber: number
  }[] = [];

  constructor(private interactionService: IshtarInteractionService,
              private userProfileService: UserProfileService) { }

  ngOnInit() {
    console.log(this.artistListFormatted);
    this.userProfileService.requestUserDetails().subscribe(
        data => {
          this.client = data.Data;
          console.log('user:', data);
        },
        error => {
          console.log(error);
        }
    );
    for (const i of this.artistListFormatted) {
      this.types.push(i.artType);
      // Fetch Painting View Interaction
      this.viewData.row = i.id;
      this.viewData.interaction = InteractionConsts.INTERACTION_TYPE_FOLLOW;
      this.interactionService.getInteraction(this.viewData).subscribe(
          (data: { Data: Array<any> }) => {
            this.artistIDFollow.push({
              id: i.id,
              followNumber: data.Data[0].interactions
            });
            this.artistList.push({
              id: i.id,
              image: i.image,
              name: i.name,
              paintingNumber: i.painting,
              artistFollowers: data.Data[0].interactions
            });
          },
          error => {
            console.log(error);
          }
      );

    }
    // create array of types after removing the repeated value
    this.types = [...new Set(this.types)];

    // Create Pagination Config
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.artistList.length
    };
    // Create for Pagination data
    // for (let k = 0; k < this.artistList.length; k++) {
    //   this.artistList.push(
    //       {
    //         id: k + 1,
    //         value: 'items number ' + (k + 1)
    //       }
    //   );
    // }
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  filterByArtType(name: string) {
    let followNumber = 0;
    this.activeArtType = name;
    this.artistList = [];
    if (name === 'all') {
      for (const i of this.artistListFormatted) {
        this.artistIDFollow.forEach((item) => {
          // Fetch The FollowNumber By Equal the ID
          if (item.id === i.id) {
            followNumber = item.followNumber;
          }
        });
        this.artistList.push({
          image: i.image,
          name: i.name,
          paintingNumber: 4,
          id: i.id,
          artistFollowers: followNumber
        });
      }
    } else {
      for (const i of this.artistListFormatted) {
        this.artistIDFollow.forEach((item) => {
          // Fetch The FollowNumber By Equal the ID
          if (item.id === i.id) {
            followNumber = item.followNumber;
          }
        });
        if (i.artType === name) {
          this.artistList.push({
            image: i.image,
            name: i.name,
            paintingNumber: 4,
            id: i.id,
            artistFollowers: followNumber
          });
        }
      }
    }
  }

  // Increase view for Artist
  viewArtist(id: number) {
    this.viewData.row = id;
    this.interactionService.addViewInteraction(this.viewData).subscribe(
        res => {
          console.log('This Artist Was Reviewed', res);
        },
        error => {
          console.log(error);
        }
    );
  }

  // Sort Method From larger FollowNumber To Smallest
  sortItemsByLargeFollowNumber() {
    this.artistList.sort(
        (a, b) => (Number(a.artistFollowers) < Number(b.artistFollowers))
            ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
                ? ((Number(a.artistFollowers) < Number(b.artistFollowers))
                    ? 1 : -1) : -1 );
    for (const x of this.artistList) {
      console.log(x.artistFollowers);
    }
  }

  // Sort Method From Small FollowNumber To Bigest
  sortItemsByLowerFollowNumber() {
    this.artistList.sort(
        (a, b) => (Number(a.artistFollowers) > Number(b.artistFollowers))
            ? 1 : (Number(a.artistFollowers) === Number(b.artistFollowers))
                ? ((Number(a.artistFollowers) > Number(b.artistFollowers))
                    ? 1 : -1) : -1 );
    for (const x of this.artistList) {
      console.log(x.artistFollowers);
    }
  }

}
