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
  magnifyingImage = false;

  constructor(private interactionService: IshtarInteractionService) { }

  ngOnInit() { }

  // Increase view for Statue
  viewStatue(statueId: number) {
    const viewData: ViewInterface = {
      entity: InteractionConsts.ENTITY_TYPE_STATUE,         // 2: For Statue Entity
      row: statueId,                                        // this for Statue id
      interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
      client: 0,                                            // this for client id
    };
    this.interactionService.addViewInteraction(viewData).subscribe(
        res => {
          console.log('This Statue Was Reviewed', res);
        },
        error => {
          console.log(error);
        }
    );
  }

  noFilter() {
    this.statuesListFiltered = this.statuesList;
  }

  filterName(event) {
    let btn_name = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (btn_name === this.statuesList[i].name) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterArtistName(event) {
    let btn_name = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (btn_name === this.statuesList[i].artist.name) {
       this.statuesListFiltered[i] = this.statuesList[i];
      }
    }
  }

  filterMaterial(event) {
    let btn_name = event.target.name;
    this.statuesListFiltered = [];
    for (let i = 0; i < this.statuesList.length; i++) {
      if (btn_name === this.statuesList[i].material) {
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
    let btn_number = event.target.name;
    let info_id: string = 'info_' + btn_number;
    console.log(btn_number);
    if (this.magnifyingImage) {
      document.getElementById(info_id).style.display = 'block';
      this.magnifyingImage = false;
    } else {
      document.getElementById(info_id).style.display = 'none';
      this.magnifyingImage = true;
    }
  }

}
