import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {LoveRequest} from '../../../entity/love-interaction/love-request';
import { all } from 'q';

@Component({
  selector: 'app-c-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {
  @Output() PaintingViewNumber = new EventEmitter<{ id: number, viewNumber: number }[]>();
  @Input() filter = true;
  public artists: string[];
  public artTypes: string[];
  @Input() formattedPaintingList: PaintingListItem[];
  paintingList: PaintingListItem[];
  config: any;
  filterArtType = false;
  filterArtist = false;
  paintingsView: {
    id: number,
    viewNumber: number
  }[] = [];
  paintingsLove: {
    id: number,
    loveNumber: number
  }[] = [];

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    // Fetch Paintings
    this.paintingList = this.formattedPaintingList;
    // region Artists Collecting
    this.artists = [];
    for (const image of this.formattedPaintingList) {
      this.artists.push(image.artist);
      // Get View Interaction For Every Painting
      this.interactionService.getInteractionsNumber(
          InteractionConsts.ENTITY_TYPE_PAINTING,
          image.id,
          InteractionConsts.INTERACTION_TYPE_VIEW)
          .subscribe(
              (data: any) => {
                // console.log('Painting View: Id:', image.id, ' => View Number: ' , data.Data[0].interactions);
                this.paintingsView.push({
                  id: image.id,
                  viewNumber: data.Data[0].interactions
                });
              }, error => {
                console.log(error);
              }
          );
      // Get Love Interaction For Every Painting
      this.interactionService.getInteractionsNumber(
          InteractionConsts.ENTITY_TYPE_PAINTING,
          image.id,
          InteractionConsts.INTERACTION_TYPE_LOVE)
          .subscribe(
              (data: any) => {
                console.log('Painting Love: Id:', image.id, ' => Love: ' , data.Data[0].interactions);
                this.paintingsLove.push({
                  id: image.id,
                  loveNumber: data.Data[0].interactions
                });
              }, error => {
                console.log(error);
              }
          );
      /*
      // Fetch Painting View Interaction
      this.viewData.row = image.id;
      this.interactionService.getInteraction(this.viewData).subscribe(
          (data: {Data: any}) => {
            console.log(data);
            this.paintingsView.push({
              id: image.id,
              viewNumber: data.Data[0].interactions
            });
          }
      );
      // Get All Paintings Love Interactions
      this.loveData.row = image.id;
      this.interactionService.getInteraction(this.loveData).subscribe(
          (data: {Data: any}) => {
            this.paintingsLove.push({
              id: image.id,
              loveNumber: data.Data[0].interactions
            });
          }
      );*/
    }
    // make loop inside paintingsView and remove the repeated value
    this.paintingsView = [...new Set(this.paintingsView)];
    // Passing Data From Child Component To Parent Component
    this.PaintingViewNumber.emit(this.paintingsView);
    // make loop inside artists and remove the repeated value
    this.artists = [...new Set(this.artists)];
    // region Art Type Collecting
    this.artTypes = ['all'];
    for (const image of this.formattedPaintingList) {
      this.artTypes.push(image.artType);
    }
    this.artTypes = [...new Set(this.artTypes)];

    // Create Pagination Config
    this.config = {
      itemsPerPage: 12,
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
    if (this.paintingList.length > 12) {
      document.getElementById('my-pagination').style.display = 'block';
     } else {
       document.getElementById('my-pagination').style.display = 'none';
     }
  }


  public filterByArtist(name: string) {
    const paintingList: PaintingListItem[] = [];
    for (const painting of this.formattedPaintingList) {
      painting.artist === name ? paintingList.push(painting) : console.log(painting.artist === name);
    }
    this.paintingList = paintingList;
    if (this.paintingList.length > 12) {
      document.getElementById('my-pagination').style.display = 'block';
     } else {
       document.getElementById('my-pagination').style.display = 'none';
     }
  }

  viewImage(paintingId: number) {
    this.interactionService.addViewInteraction(paintingId, 'painting');
  }

  // view & hide filter button options
  fiterArtTypeOptionsView() {
    this.filterArtist = false;
    if (this.filterArtType) {
      this.filterArtType = false;
    } else {
      this.filterArtType = true;
    }
  }

  fiterArtistOptionsView() {
    this.filterArtType = false;
    if (this.filterArtist) {
      this.filterArtist = false;
    } else {
      this.filterArtist = true;
    }
  }

}
