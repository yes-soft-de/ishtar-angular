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
  interactionsList: {
    id: number,
    entities: string,
    row: number,
    interaction: string,
    client: number
  }[] = [];
  config: any;

  constructor(private interactionsService: InteractionsService) { }

  ngOnInit() {
    // Fetch All Interactions
    this.interactionsService.getAllInteractions().subscribe(
        (data: InteractionResponse) => {
          this.interactions = data.Data.sort((a, b) => Number(a.id) - Number(b.id));
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
        }
    );

    console.log('interactions list', this.interactionsList);
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

}
