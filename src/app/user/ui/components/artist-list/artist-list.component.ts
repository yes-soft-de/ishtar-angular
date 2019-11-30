import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import { InteractionConsts } from 'src/app/user/consts/interaction/interaction-consts';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss', '../../widgets/follow-widget/follow-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistListComponent implements OnInit {
  @Input() filter = true;
  @Input() artistListFormatted: ArtistListItem[];
  @Input() search = true;
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
  // viewData: ViewInterface = {
  //   entity: InteractionConsts.ENTITY_TYPE_ARTIST,      // 2: For Artist Entity
  //   row: 0,         // this for Artist id
  //   interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
  //   client: 0,      // this for client id
  // };
  artistIDFollow: {
    id: number,
    followNumber: number
  }[] = [];

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    console.log('artist list: ', this.artistListFormatted);
    for (const i of this.artistListFormatted) {
      this.types.push(i.artType);
      // Fetch Artist Follow Interaction
      this.interactionService.getInteractionsNumber(
          InteractionConsts.ENTITY_TYPE_ARTIST,       // 2: For Artist Entity
          i.id,                                       // this for Artist id
          InteractionConsts.INTERACTION_TYPE_FOLLOW)  // 3: for view interaction
          .subscribe(
        (data: any) => {
          // console.log('Artist Follow: Id:', i.id, ' => Follow: ' , data.Data[0].interactions);
          this.artistIDFollow.push({
            id: i.id,
            followNumber: data.Data[0].interactions
          });
          this.artistList.push({
            id: i.id,
            image: i.path,
            name: i.name,
            paintingNumber: i.painting,
            artistFollowers: data.Data[0].interactions
          });
          this.artistList.sort(
              (a, b) => (Number(a.id) > Number(b.id))
                  ? 1 : (Number(a.id) === Number(b.id))
                      ? ((Number(a.id) > Number(b.id))
                          ? 1 : -1) : -1 );
        }, error => {
          console.log(error);
        }
      );
      /*
      // Fetch Painting View Interaction
      this.viewData.row = i.id;
      this.viewData.interaction = InteractionConsts.INTERACTION_TYPE_FOLLOW;
      this.interactionService.getInteraction().subscribe(
          (data: { Data: Array<any> }) => {
            console.log('interactions:', data);
            this.artistIDFollow.push({
              id: i.id,
              followNumber: data.Data[0].interactions
            });
            this.filteredList.push({
              id: i.id,
              image: i.path,
              name: i.name,
              paintingNumber: i.painting,
              artistFollowers: data.Data[0].interactions
            });
            // sort the array Elements
            this.filteredList.sort(
                (a, b) => (Number(a.id) > Number(b.id))
                    ? 1 : (Number(a.id) === Number(b.id))
                        ? ((Number(a.id) > Number(b.id))
                            ? 1 : -1) : -1 );
          }
      );*/
    }
    // create array of types after removing the repeated value
    this.types = [...new Set(this.types)];
    // Create Pagination Config
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.artistList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  filterByArtType(name: string) {
    let followNumber = 0;
    this.activeArtType = name;
    this.filteredList = [];
    if (name === 'all') {
      for (const i of this.artistListFormatted) {
        this.artistIDFollow.forEach((item) => {
          // Fetch The FollowNumber By Equal the ID
          if (item.id === i.id) {
            followNumber = item.followNumber;
          }
        });
        this.artistList.push({
          image: i.path,
          name: i.name,
          paintingNumber: i.painting,
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
            image: i.path,
            name: i.name,
            paintingNumber: i.painting,
            id: i.id,
            artistFollowers: followNumber
          });
        }
      }
    }
  }

  // Increase view for Artist
  viewArtist(artistId: number) {
    this.interactionService.addViewInteraction(artistId, 'artist');
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
