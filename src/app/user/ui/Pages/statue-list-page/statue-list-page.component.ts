import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatueDetailInterface} from '../../../entity/statue/statue-detail-interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';

@Component({
  selector: 'app-statue-list-page',
  templateUrl: './statue-list-page.component.html',
  styleUrls: ['./statue-list-page.component.scss']
})
export class StatueListPageComponent implements OnInit {
  statuesListPage: StatueDetailInterface;
  statuesListFiltered: StatueDetailInterface;
  statueIDView: {
    id: number,
    viewNumber: number
  }[] = [];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private interactionService: IshtarInteractionService,
              private statueDetailService: StatueService) { }

  ngOnInit() {
     // Fetch statue id using Observable
      this.fetchData();
  }

  private fetchData() {

    // Fetch All Statues
    this.statueDetailService.getAllStatues().subscribe(
        (data: any) => {
          this.statuesListPage = data.Data;
          // Make Loop For Fetch the View interactions for every statue
          data.Data.map(statuesResponse => {
            this.interactionService.getInteractionsNumber(
                InteractionConsts.ENTITY_TYPE_STATUE,
                statuesResponse['0'].id,
                InteractionConsts.INTERACTION_TYPE_VIEW)
                .subscribe(
                    (res: any) => {
                      console.log('Statue View: Id:', statuesResponse['0'].id, ' => View: ' , res.Data[0].interactions);
                      this.statueIDView.push({
                        id: statuesResponse['0'].id,
                        viewNumber: res.Data[0].interactions
                      });
                    }, error => {
                      console.log('Error Interactions: ', error);
                    }
                );
          });
        }, error => {
          console.log('Error Fetching All Statues: ', error);
        }
    );
  }

}
