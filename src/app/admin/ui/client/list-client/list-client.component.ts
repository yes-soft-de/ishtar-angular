import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../../entity/client/client';
import {ClientService} from '../../../service/client/client.service';
import {ClientListResponse} from '../../../entity/client/client-list-response';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ClientInterface} from '../../../entity/client/client-interface';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit, OnDestroy {
  clients: ClientInterface[];
  clientsList: ClientInterface[] = [];
  clientsFilterList: ClientInterface[] = [];
  allClientObservable: Subscription;
  config: any;                    // Config Variable For Pagination Configuration
  name: string;                   // name variable to store the input search value

  constructor(private router: Router,
              private route: ActivatedRoute,
              private clientService: ClientService,
              private toaster: ToastrService) { }

  ngOnInit() {
    this.getAllClients();
  }

  ngOnDestroy() {
      this.allClientObservable.unsubscribe();
  }

  getAllClients() {
    // Fetch All Users
    this.allClientObservable = this.clientService.getAllClients().subscribe(
    (data: ClientListResponse) => {
      if (data) {
        this.clients = data.Data;
        for (const client of this.clients) {
          this.clientsList.push({
            id: client.id,
            fullName: client.fullName,
            image: client.image,
            roles: client.roles,
            username: client.username,
            email: client.email,
            birthDate: client.birthDate,
            phone: client.phone,
            createDate: client.createDate,
            createdBy: client.createdBy,
            updateDate: client.updateDate,
            updatedBy: client.updatedBy
          });
        }
        console.log('Admin Clients: ', this.clients);
      }
      }, error => {
        console.log('There is Error : ', error);
      },
      () => {
        this.clientsFilterList = this.clientsList;
      });
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.clientsList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
  }


    // Delete The Client
  delete(clientId) {
    if (confirm('Are You Sure You Want To Delete This Client')) {
    this.clientService.deleteClient(clientId).subscribe(
      data => {
        console.log('The delete request was successfully done', data);
        this.toaster.success('Client Successfully Deleted');
      },
      error => {
        console.log('Sorry There Is Error : ', error);
        this.toaster.error('There Is An Error Please Try Again');
      },
      () => {
        this.getAllClients();
      }
    );
    } else {
      return false;
    }
  }

  applyFilter() {
    // if the search input value is empty
    if (!this.name) {
      this.clientsFilterList = [...this.clientsList];
    } else {
      this.clientsFilterList = [];
      this.clientsFilterList = this.clientsList.filter(res => {
        let fullNameResult;
        let userNameResult;
        // Check if the full name field is null
        if (res.fullName) {
          // Search In First Name Column
          fullNameResult = res.fullName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }
        // Check if the Username field is null
        if (res.username) {
          // Search In userName Column
          userNameResult = res.username.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }

        if (fullNameResult) {
          // display the Name Column
          return fullNameResult;
        } else if (userNameResult) {
          // display the userName Column
          return userNameResult;
        }
      });
    }
  }


}
