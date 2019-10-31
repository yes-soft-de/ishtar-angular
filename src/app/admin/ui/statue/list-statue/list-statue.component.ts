import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatuesResponse} from '../../../entity/statue/statues.response';
import {StatueInterface} from '../../../entity/statue/statue.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-statue',
  templateUrl: './list-statue.component.html',
  styleUrls: ['./list-statue.component.scss']
})
export class ListStatueComponent implements OnInit {
  statues: {0: StatueInterface, price: string}[];

  constructor(private statueService: StatueService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) { }

  ngOnInit() {
    this.getStatues();
  }

  getStatues() {
    // Get All Statues
    this.statueService.getAllStatues().subscribe(
        (data: StatuesResponse) => {
          this.statues = data.Data;
          console.log(this.statues);
        }, error => {
          console.log(error);
        }
    );
  }

  delete(id: number) {
    if (confirm('Are You Sure You Want To Delete This Statue')) {
      this.statueService.deleteStatue(id).subscribe(
          data => {
            this.toaster.success('Statue Successfully Deleted');
            console.log('deleted Successfully: ', data);
          },
          error => {
            console.log('error : ', error);
            this.toaster.error('There Is An Error Please Try Again');
          }, () => {
            this.getStatues();
          }
      );
    } else {
      return false;
    }
  }


}
