import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatueDetailInterface} from '../../../entity/statue/statue-detail-interface';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StatueDetailResponse} from '../../../entity/statue/statue-detail-response';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {StatueListResponse} from '../../../entity/statue/statue-list-response';
import {ArtistListService} from '../../../service/artist-list/artist-list.service';

@Component({
  selector: 'app-statue-detail-page',
  templateUrl: './statue-detail-page.component.html',
  styleUrls: ['./statue-detail-page.component.scss']
})
export class StatueDetailPageComponent implements OnInit {
  statueId: number;
  statueDetailPage: StatueDetailInterface;
  statuesListPage: StatueDetailInterface[];
  artistDetail: any;
  viewData: ViewInterface = {
    entity: InteractionConsts.ENTITY_TYPE_STATUE,      // 1: For Painting Entity
    row: 0,         // this for painting id
    interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
    client: 0,      // this for client id
  };
  statueViewPage: {interactions: string}[] = [];    // view for specific statue
  statuesViewsData: ViewInterface = {
    entity: InteractionConsts.ENTITY_TYPE_STATUE,      // 1: For Painting Entity
    row: 0,         // this for painting id
    interaction: InteractionConsts.INTERACTION_TYPE_VIEW, // 3: for view interaction
    client: 0,      // this for client id
  };
  statuesViewPage: {    // view for all statues
    id: number,
    viewNumber: number
  }[] = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private statueService: StatueService,
              private artistListService: ArtistListService,
              private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    // Fetch statue id using Observable
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.statueId = Number(param.get('id'));
      this.fetchData(this.statueId);

      setTimeout(() => {
        for (const statue of this.statuesListPage) {
          // Fetch Painting View Interaction
          this.statuesViewsData.row = statue.id;
          this.interactionService.getInteraction(this.statuesViewsData).subscribe(
              (data: {Data: any}) => {
                console.log(data);
                this.statuesViewPage.push({
                  id: statue.id,
                  viewNumber: data.Data[0].interactions
                });
              },
              error => {
                console.log(error);
              }
          );
        }
        console.log('statuesView', this.statuesViewPage);
      }, 2500);
    });
  }

  private fetchData(statueID: number) {
    // Fetch All Statues Data
    this.statueService.getStatueUsingId(statueID).subscribe(
        (data: StatueDetailResponse) => {
          this.statueDetailPage = data.Data;
          console.log('Statue Detail : ', this.statueDetailPage);
          this.getArtistForThisStatue();
        }, error => {
          console.log('Error Fetching Statues: ', error);
        }
    );

    // Fetch All Statues
    this.statueService.getAllStatues().subscribe(
        (data: StatueListResponse) => {
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

  // Fetch Artist For This Statue
  private getArtistForThisStatue() {
    this.artistListService.requestArtistList().subscribe(
    data => {
        data.Data.map(res => {
          if (res.name === this.statueDetailPage.artist.name) {
              this.artistDetail = res;
              console.log('Artist For This Statue: ', this.artistDetail);
            }
          });
        }
    );
  }
}
