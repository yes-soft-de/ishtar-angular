import { Component, OnInit } from '@angular/core';
import {InteractionInterface} from '../../../entity/interactions/interaction-interface';
import {InteractionsService} from '../../../service/interactions/interactions.service';
import {InteractionResponse} from '../../../entity/interactions/interaction-response';

@Component({
  selector: 'app-list-interaction',
  templateUrl: './list-interaction.component.html',
  styleUrls: ['./list-interaction.component.scss']
})
export class ListInteractionComponent implements OnInit {
  interactions: InteractionInterface[];
  interactionsFilterList = [];      // We Create It Second For Filter
  interactionsList: {               // We Create It First For Pagination
    id: number,
    entities: string,
    row: number,
    interaction: string,
    client: number
  }[] = [];
  config: any;    // Config Variable For Pagination Configuration
  name: string;   // name variable to store the input search value

  constructor(private interactionsService: InteractionsService) { }

  ngOnInit() {
    this.getInteractions();
  }

  getInteractions() {
    // Fetch All Interactions
    this.interactionsService.getAllInteractions().subscribe(
        (data: InteractionResponse) => {
          this.interactions = data.Data.sort((a, b) => Number(a.id) - Number(b.id));
          this.interactionsList = [];
          for (const interaction of this.interactions) {
            this.interactionsList.push({
              id: interaction.id,
              entities: interaction.entity,
              row: interaction.row,
              interaction: interaction.interaction,
              client: interaction.client
            });
          }
          console.log('Admin Interactions: ', data.Data);
        }, error => { console.log(error); },
        () => {
          this.interactionsFilterList = this.interactionsList;
        }
    );
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.interactionsList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }

  applyFilter() {
    // if the search input value is empty
    if (!this.name) {
      this.interactionsFilterList = [...this.interactionsList];
    } else {
      this.interactionsFilterList = [];
      this.interactionsFilterList = this.interactionsList.filter(res => {
        // for (const [key, value] of Object.entries(res)) {
        //     console.log(`${key}: ${value}`);
        // }
        // Search In Entity Column
        const interactionsResult = res.interaction.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        // Search In Interactions Column
        const entitiesResult = res.entities.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        if (entitiesResult) {
          // display the Entity Column
          return entitiesResult;
        } else if (interactionsResult) {
          // display the Interactions Column
          return interactionsResult;
        }
      });
    }
  }

}
