import { Component, OnInit } from '@angular/core';
import {StatueDetailService} from '../../../service/statue-detail/statue-detail.service';
import {StatueDetailInterface} from '../../../entity/statue-detail/statue-detail-interface';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StatueDetailResponse} from '../../../entity/statue-detail/statue-detail-response';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-statue-detail-page',
  templateUrl: './statue-detail-page.component.html',
  styleUrls: ['./statue-detail-page.component.scss']
})
export class StatueDetailPageComponent implements OnInit {
  statueId: number;
  statueDetailPage: StatueDetailInterface;
  statuesListPage: StatueDetailInterface;
  viewData: ViewInterface = {
    entity: InteractionConsts.ENTITY_TYPE_STATUE,      // 1: For Painting Entity
    row: 0,         // this for painting id
    interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
    client: 0,      // this for client id
  };
  // statueView: {viewNumber: number}[] = [];
  statueViewPage: any[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private statueDetailService: StatueDetailService,
              private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    // Fetch statue id using Observable
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.statueId = Number(param.get('id'));
      this.fetchData(this.statueId);
    });

  }

  private fetchData(statueID: number) {
    // Fetch All Statues Data
    this.statueDetailService.getStatueUsingId(statueID).subscribe(
        (data: StatueDetailResponse) => {
          this.statueDetailPage = data.Data[0];
          console.log('Statue Detail : ', this.statueDetailPage);
        }, error => {
          console.log('Error Fetching Statues: ', error);
        }
    );

    // Fetch All Statues
    this.statueDetailService.getAllStatues().subscribe(
        (data: any) => {
          this.statuesListPage = data.Data;
          console.log('Statues List : ', this.statuesListPage);
        }, error => {
          console.log('Error Fetching All Statue Statues: ', error);
        }
    );

    // Fetch View Interaction For This Statue
    this.viewData.row = statueID;
    this.interactionService.getInteraction(this.viewData).subscribe(
        (data: {Data: any}) => {
            console.log('Statue View: ', data.Data);
            this.statueViewPage = data.Data;
        },
        error => {
          console.log(error);
        }
    );

  }
}
