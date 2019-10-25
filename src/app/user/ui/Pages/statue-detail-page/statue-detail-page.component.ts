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
import {forkJoin, Observable} from 'rxjs';
import {ArtistListItem} from '../../../entity/artist-list/artist-list-item';
import {ArtistListResponse} from '../../../entity/artist-list/artist-list-response';

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
    });
  }

  private fetchData(statueID: number) {
    this.viewData.row = statueID;   // Insert statue id to get it own view interaction
    const statueUsingIDObservable: Observable<any> = this.statueService.getStatueUsingId(statueID);
    const allStatuesObservable: Observable<any> = this.statueService.getAllStatues();
    const viewStatueObservable: Observable<any>  = this.interactionService.getInteraction(this.viewData);
    const allArtistObservable: Observable<ArtistListResponse> = this.artistListService.requestArtistList();
    // join all observable with each other to fetch all data and display them in the same time
    const combinedObservable = forkJoin(statueUsingIDObservable, allStatuesObservable, viewStatueObservable, allArtistObservable);
    combinedObservable.subscribe(data => {
      this.statueDetailPage = data[0].Data;     // Fetch Specific Statue Data
      this.statuesListPage = data[1].Data;      // Fetch All Statues
      this.statueViewPage = data[2].Data;       // Fetch view interaction for specific statue
      data[3].Data.map(res => {       // Fetch Artist For This Statue
        if (res.name === this.statueDetailPage.artist.name) {
            this.artistDetail = res;
          }
        });
      console.log('Statue Detail : ', this.statueDetailPage);
      console.log('Statues List : ', this.statuesListPage);
      console.log('Statue View: ', this.statueViewPage);
      console.log('Artist For This Statue: ', this.artistDetail);
    }, error => {
      console.log('this is error', error);
    }, () => {
      for (const statue of this.statuesListPage) {
        // Fetch Painting View Interaction
        this.statuesViewsData.row = statue.id;    // fetch id for every statue
        this.interactionService.getInteraction(this.statuesViewsData).subscribe(
            (data: {Data: any}) => {
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
      console.log('All statues Interactions: ', this.statuesViewPage);
    });
  }

}
