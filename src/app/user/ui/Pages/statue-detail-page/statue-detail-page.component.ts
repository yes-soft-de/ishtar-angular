import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatueDetailInterface} from '../../../entity/statue/statue-detail-interface';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ViewInterface} from '../../../entity/interaction/view.interface';
import {InteractionConsts} from '../../../consts/interaction/interaction-consts';
import {IshtarInteractionService} from '../../../service/ishtar-interaction/ishtar-interaction.service';
import {ArtistService} from '../../../service/artist/artist.service';
import {forkJoin, Observable} from 'rxjs';

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
              private artistListService: ArtistService,
              private interactionService: IshtarInteractionService) { }

  ngOnInit() {
    // Fetch statue id using Observable
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.statueId = Number(param.get('id'));
      this.fetchData(this.statueId);
    });
  }

  private fetchData(statueID: number) {
    // Fetch Statue Detail
    const statueDetailObservable: Observable<any> = this.statueService.getStatueDetail(statueID);
    // Fetch All Statues
    const allStatuesObservable: Observable<any> = this.statueService.getAllStatues();
    // Fetch Number Of View Interactions For This Statues
    const viewStatueObservable: Observable<any>  = this.interactionService.getInteractionsNumber(
                                                            InteractionConsts.ENTITY_TYPE_STATUE,
                                                            this.statueId,
                                                            InteractionConsts.INTERACTION_TYPE_VIEW);
    // Fetch All Artist
    const allArtistObservable: Observable<any> = this.artistListService.requestArtistList();
    // join all observable with each other to fetch all data and display them in the same time
    const combinedObservable = forkJoin(statueDetailObservable, allStatuesObservable, viewStatueObservable, allArtistObservable);
    combinedObservable.subscribe(data => {
      this.statueDetailPage = data[0].Data;     // Fetch Specific Statue Data
      this.statuesListPage = data[1].Data;      // Fetch All Statues
      this.statueViewPage = data[2].Data;       // Fetch view interaction for specific statue
      data[3].Data.map(res => {                 // Fetch Artist For This Statue
        if (res.name === this.statueDetailPage.artist.name) {
            this.artistDetail = res;
          }
        });
      console.log('Statue Detail : ', this.statueDetailPage);
      console.log('Statues List : ', this.statuesListPage);
      console.log('Statue View: ', this.statueViewPage);
      console.log('Artist For This Statue: ', this.artistDetail);
    }, error => {
      console.log('Error: ', error);
    }, () => {
      for (const statue of this.statuesListPage) {
        // Fetch All Painting Views Interaction
        this.interactionService.getInteractionsNumber(
            InteractionConsts.ENTITY_TYPE_STATUE,
            statue['0'].id,
            InteractionConsts.INTERACTION_TYPE_VIEW)
            .subscribe(
                (data: any) => {
                  console.log('Statue View: Id:', statue['0'].id, ' => View Number: ' , data.Data[0].interactions);
                  this.statuesViewPage.push({
                    id: statue['0'].id,
                    viewNumber: data.Data[0].interactions
                  });
                }, error => {
                  console.log(error);
                }
            );
        // this.statuesViewsData.row = statue.id;    // fetch id for every statue
        // this.interactionService.getInteraction(this.statuesViewsData).subscribe(
        //     (data: {Data: any}) => {
        //       this.statuesViewPage.push({
        //         id: statue.id,
        //         viewNumber: data.Data[0].interactions
        //       });
        //     },
        //     error => {
        //       console.log(error);
        //     }
        // );
      }
      console.log('All statues Interactions: ', this.statuesViewPage);
    });
  }

}
