import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { StatueDetailInterface } from 'src/app/user/entity/statue/statue-detail-interface';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';

@Component({
  selector: 'app-statue-list',
  templateUrl: './statue-list.component.html',
  styleUrls: ['./statue-list.component.scss', '../../widgets/ngx-image-zoom/ngx-image-zoom.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatueListComponent implements OnInit {
  @Input() statuesList: StatueDetailInterface[];
  @Input() statuesListFiltered: StatueDetailInterface[];
  @Input() statuesInteraction: { id: number, viewNumber: number }[];
  magnifyingImage = false;

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    console.log(this.statuesList, this.statuesListFiltered, this.statuesInteraction);
    // for (const)
  }



  // Increase view for Statue
  viewStatue(statueId: number) {
    this.interactionService.addViewInteraction(statueId, 'statue');
  }

  noFilter() {
    this.statuesListFiltered = this.statuesList;
  }

  filterName(event) {
    const BTN_NAME = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (BTN_NAME === this.statuesList[i].name) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterArtistName(event) {
    const BTN_NAME = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (BTN_NAME === this.statuesList[i].artist.name) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterMaterial(event) {
    const BTN_NAME = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (BTN_NAME === this.statuesList[i].material) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
   }
  }

  filterSmallSize() {
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if ((this.statuesList[i].width <= 2.54) && (this.statuesList[i].height <= 1.27) ) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterMediumSize() {
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if ((this.statuesList[i].width > 2.54) &&
          (this.statuesList[i].width <= 3.81) &&
          (this.statuesList[i].height > 1.27) &&
          (this.statuesList[i].height <= 2.54)) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterBigSize() {
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if ((this.statuesList[i].width > 3.81) && (this.statuesList[i].height > 2.54) ) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  MagnifyingImage(event) {
    const BTN_NUMBER = event.target.name;
    const INFO_ID: string = 'info_' + BTN_NUMBER;
    console.log(BTN_NUMBER);
    if (this.magnifyingImage) {
      document.getElementById(INFO_ID).style.display = 'block';
      this.magnifyingImage = false;
    } else {
      document.getElementById(INFO_ID).style.display = 'none';
      this.magnifyingImage = true;
    }
  }

}
