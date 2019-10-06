import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {UserInfo} from '../../../entity/user/user-info';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';

@Component({
  selector: 'app-c-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  @Input() filter = true;
  public artists: string[];
  public artTypes: string[];
  @Input() formattedPaintingList: PaintingListItem[];
  paintingList: PaintingListItem[];
  client: UserInfo;
  config: any;
  viewData: ViewInterface = {
    entity: InteractionConsts.ENTITY_TYPE_PAINTING,      // 1: For Painting Entity
    row: 0,         // this for painting id
    interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
    client: 0,      // this for client id
  };
  paintingsView: {
    id: number,
    viewNumber: number
  }[] = [];

  constructor(private interactionService: IshtarInteractionService,
              private userProfileService: UserProfileService) { }

  ngOnInit() {
    // Fetch User info
    this.userProfileService.requestUserDetails().subscribe(
        data => {
          this.client = data.Data;
        },
        error => {
          console.log(error);
        }
    );
    // Fetch Paintings
    this.paintingList = this.formattedPaintingList;
    // region Artists Collecting
    this.artists = [];
    for (const image of this.formattedPaintingList) {
      this.artists.push(image.artist);
      // Fetch Painting View Interaction
      this.viewData.row = image.id;
      this.viewData.client = this.client.id;
      this.interactionService.getInteraction(this.viewData).subscribe(
          (data: {Data: any}) => {
            this.paintingsView.push({
              id: image.id,
              viewNumber: data.Data[0].interactions
            });
          },
          error => {
            console.log(error);
          }

      );
    }
    // make loop inside paintingsView and remove the repeated value
    this.paintingsView = [...new Set(this.paintingsView)];
    // make loop inside artists and remove the repeated value
    this.artists = [...new Set(this.artists)];
    // endregion
    // region Art Type Collecting
    this.artTypes = ['all'];
    for (const image of this.formattedPaintingList) {
      this.artTypes.push(image.artType);
    }
    this.artTypes = [...new Set(this.artTypes)];

    // Create Pagination Config
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.paintingList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  public filterByArtType(name: string) {
    const paintingList: PaintingListItem[] = [];
    const paintingListAll: any[] = [];
    if (name === 'all') {
      for (const painting of this.formattedPaintingList) {
        paintingListAll.push(painting);
      }
      this.paintingList = paintingListAll;
    } else {
      for (const painting of this.formattedPaintingList) {
        if (painting.artType === name) {
          paintingList.push(painting);
        }
      }
      this.paintingList = paintingList;
    }
  }


  public filterByArtist(name: string) {
    const paintingList: PaintingListItem[] = [];
    for (const painting of this.formattedPaintingList) {
      painting.artist === name ? paintingList.push(painting) : console.log(painting.artist === name);
    }
    this.paintingList = paintingList;
  }

  viewImage(id: number) {
    this.viewData.row = id;
    this.interactionService.addViewInteraction(this.viewData).subscribe(
        res => {
          console.log('Painting Reviewed : ', res);
        },
        error => {
          console.log(error);
        }
    );
  }
}
