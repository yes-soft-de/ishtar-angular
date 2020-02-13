import {Component, Input, OnInit} from '@angular/core';
import {InteractionsService} from '../../service/interactions.service';
import {ActivatedRoute} from '@angular/router';
import {Interactions} from '../../entitiy/interactions';
import {InteractionConsts} from '../../statics/interaction-consts';
import {CodeConverter} from '../../statics/code.converter';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  interactions = 0;

  @Input() EntityName: string;        // EntityName Name as : painting, artist, statue....
  @Input() Row: number;           // Row Id as : paintingId, artistID ....
  @Input() interactionTypeString: string;   // interactions Name as : love, view, ....

  interactionCode = -1; // null/invalid interaction code indicator
  entityCode = -1; // null/invalid entity indicator

  constructor(private interactionsService: InteractionsService) {
  }

  ngOnInit() {
    this.entityCode = CodeConverter.getEntityCode(this.EntityName);
    this.interactionCode = CodeConverter.getInteractionCode(this.interactionTypeString);

    if (this.interactionCode > -1 && this.entityCode > -1) {
      this.interactionsService.getInteractionsNumber(this.entityCode, this.Row, this.interactionCode).subscribe(
        data => {
          this.interactions = data;
        }
      );
    }
  }
}
