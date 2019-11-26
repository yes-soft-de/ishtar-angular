import {Component, Input, OnInit} from '@angular/core';
import {InteractionsService} from '../../service/interactions.service';
import {ActivatedRoute} from '@angular/router';
import {Interactions} from '../../entitiy/interactions';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  interactions: {
    id: number,
    interactionType: string,
    interactionNumber: number
  }[] = [];
  @Input() Entity: string;        // Entity Name as : painting, artist, statue....
  @Input() Row: number;           // Row Id as : paintingId, artistId ....
  @Input() interaction: string;   // interactions Name as : love, view, ....

  constructor(private activatedRoute: ActivatedRoute,
              private interactionsService: InteractionsService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
        urlSegments => {
          this.interactionsService.getInteractionsNumber(this.Entity, this.Row, this.interaction).subscribe(
              data => {
                this.interactions.push(data);
              }
          );
        }
    );
  }

}
