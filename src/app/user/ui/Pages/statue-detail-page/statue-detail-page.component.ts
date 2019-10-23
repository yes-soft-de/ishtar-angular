import { Component, OnInit } from '@angular/core';
import {StatueDetailService} from '../../../service/statue-detail/statue-detail.service';
import {StatueDetailInterface} from '../../../entity/statue-detail/statue-detail-interface';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StatueDetailResponse} from '../../../entity/statue-detail/statue-detail-response';

@Component({
  selector: 'app-statue-detail-page',
  templateUrl: './statue-detail-page.component.html',
  styleUrls: ['./statue-detail-page.component.scss']
})
export class StatueDetailPageComponent implements OnInit {
  statueId: number;
  stauteDetailPage: StatueDetailInterface;
  statuesListPage: StatueDetailInterface;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private statueDetailService: StatueDetailService) { }

  ngOnInit() {
    // Fetch statue id using Observable
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.statueId = Number(param.get('id'));
      this.fetchData();
    });
  }

  private fetchData() {
    // Fetch All Statues Data
    this.statueDetailService.getStatueUsingId(this.statueId).subscribe(
        (data: StatueDetailResponse) => {
          this.stauteDetailPage = data.Data[0];
          console.log('Statue Detail : ', this.stauteDetailPage);
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

  }
}
