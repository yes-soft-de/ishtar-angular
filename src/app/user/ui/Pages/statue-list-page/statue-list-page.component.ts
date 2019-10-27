import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatueDetailInterface} from '../../../entity/statue/statue-detail-interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-statue-list-page',
  templateUrl: './statue-list-page.component.html',
  styleUrls: ['./statue-list-page.component.scss']
})
export class StatueListPageComponent implements OnInit {
  statuesListPage: StatueDetailInterface;
  statuesListFiltered: StatueDetailInterface;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
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
          console.log('Statues List : ', this.statuesListPage);
        }, error => {
          console.log('Error Fetching All Statue Statues: ', error);
        }
    );

  }

}
