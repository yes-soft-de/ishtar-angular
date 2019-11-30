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
  }

}
