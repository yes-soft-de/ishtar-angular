import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatuesResponse} from '../../../entity/statue/statues.response';
import {StatueInterface} from '../../../entity/statue/statue.interface';

@Component({
  selector: 'app-list-statue',
  templateUrl: './list-statue.component.html',
  styleUrls: ['./list-statue.component.scss']
})
export class ListStatueComponent implements OnInit {
  statues: StatueInterface[];

  constructor(private statueService: StatueService) { }

  ngOnInit() {
    // Get All Statues
    this.statueService.getAllStatues().subscribe(
        (data: StatuesResponse) => {
          this.statues = data.Data;
          console.log(data);
        }, error => {
          console.log(error);
        }
    );
  }

  delete(id) {
    return;
  }


}
