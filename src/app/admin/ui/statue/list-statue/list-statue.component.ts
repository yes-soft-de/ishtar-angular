import { Component, OnInit } from '@angular/core';
import {StatueService} from '../../../service/statue/statue.service';
import {StatuesResponse} from '../../../entity/statue/statues.response';
import {StatueInterface} from '../../../entity/statue/statue.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Statue} from '../../../entity/statue/statue';

@Component({
  selector: 'app-list-statue',
  templateUrl: './list-statue.component.html',
  styleUrls: ['./list-statue.component.scss']
})
export class ListStatueComponent implements OnInit {
  statues: StatueInterface[];
  statuesList: Statue[] = [];     // We Create It First For Pagination
  statuesFilterList = [];         // We Create It Second For Filter
  config: any;                    // Config Variable For Pagination Configuration
  name: string;                   // name variable to store the input search value

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
          this.statuesList = [];
          for (const statue of this.statues) {
            this.statuesList.push({
              id: statue.id,
              name: statue.name,
              image: statue.image,
              artist: statue.artist,
              height: statue.height,
              width: statue.width,
              weight: statue.weight,
              length: statue.length,
              state: statue.state,
              description: statue.description,
              style: statue.style,
              period: statue.period,
              mediums: statue.mediums,
              material: statue.material,
              features: statue.features,
              active: statue.active,
              keyWord: statue.keyWord,
              price: statue.price,
              createDate: statue.createDate,
              createdBy: statue.createdBy,
              updatedDate: statue.updatedDate,
              updatedBy: statue.updatedBy
            });
          }
          console.log('Admin Statues: ', this.statues);
        }, error => {
          console.log(error);
        }, () => {
          this.statuesFilterList = this.statuesList;
        }
    );

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.statuesList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
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

  applyFilter() {
    // if the search input value is empty
    if (!this.name) {
      this.statuesFilterList = [...this.statuesList];
    } else {
      this.statuesFilterList = [];
      this.statuesFilterList = this.statuesList.filter(res => {
        // Search In Name Column
        const nameResult = res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        // Search In Artist Column
        const artistResult = res.artist.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        if (nameResult) {
          // display the Name Column
          return nameResult;
        } else if (artistResult) {
          // display the Artist Column
          return artistResult;
        }
      });
    }
  }


}
