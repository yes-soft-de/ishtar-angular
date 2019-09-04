import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../../entity/client/client';
import {ClientService} from '../../../service/client/client.service';
import {ClientListResponse} from '../../../entity/ClientList/client-list-response';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  clients: Client[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private clientService: ClientService ) { }

  ngOnInit() {
    // Fetch All Users
    this.clientService.getAllClients().subscribe(
        (data: ClientListResponse) => {
            if (data) {
                this.clients = data.Data;
            }
      }, error => {
        // TODO think if there is some to do here ex : display message if there is error
        console.log('Error :', error);
      });

  }

  // Delete The Client
  delete(clientId) {
    this.clientService.deleteClient(clientId).subscribe(
      data => {
        console.log('the delete request was successfully done', data);
        this.router.navigate(['/admin/list-clients']);
      },
      error => {
        console.log('Sorry There Is Error : ', error);
      },
        () => {
        console.log('done');
        this.router.navigate(['../'], {relativeTo: this.route});
        }
    );
  }

}
