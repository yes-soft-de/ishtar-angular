import {Component, Input, OnInit} from '@angular/core';
import {PaintingListItem} from '../../../entity/painting-list/painting-list-item';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {MostSeenPaintings} from '../../../entity/most-seen-paintings/most-seen-paintings';
import {MostSeenPaintingResponse} from '../../../entity/most-seen-paintings/most-seen-painting-response';

@Component({
  selector: 'app-most-seen-paintings',
  templateUrl: './most-seen-paintings.component.html',
  styleUrls: ['./most-seen-paintings.component.scss']
})
export class MostSeenPaintingsComponent implements OnInit {
  @Input() formattedPaintingList: PaintingListItem[];
  @Input() artistListFormatted: ArtistListItem[];
  // public artists = [];
  mostViewedData: MostSeenPaintings[];
  // paintingsView: {
  //   id: number,
  //   viewNumber: number
  // }[] = [];

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    // console.log(this.artistListFormatted);
    this.interactionService.getMostViewsPaintings().subscribe(
        (data: MostSeenPaintingResponse) => {
          console.log('getMostViewsPaintings', data);
          this.mostViewedData = data.Data.slice(0, 3);
        }
    );
    // region Artists Collecting
    // this.artists = [];
    // for (const image of this.formattedPaintingList) {
    //   this.artists.push(image.artist);
      // Fetch Painting View Interaction
      // this.interactionService.getInteractionsNumber(
      //     InteractionConsts.ENTITY_TYPE_PAINTING,
      //     image.id,
      //     InteractionConsts.INTERACTION_TYPE_VIEW)
      //     .subscribe(
      //         (data: any) => {
      //           // console.log('Most Seen Painting View: Id:', image.id, ' => View Number: ' , data.Data[0].interactions);
      //           this.paintingsView.push({
      //             id: image.id,
      //             viewNumber: data.Data[0].interactions
      //           });
      //           this.paintingsView.sort((a, b) =>  Number(b.viewNumber) - Number(a.viewNumber));
      //         }, error => {
      //           console.log(error);
      //         }
      //     );

    // }
    // make loop inside paintingsView and remove the repeated value
    // this.paintingsView = [...new Set(this.paintingsView)];
    // console.log('sort: ', this.paintingsView);
    // make loop inside artists and remove the repeated value
    // this.artists = [...new Set(this.artists)];
  }

}
