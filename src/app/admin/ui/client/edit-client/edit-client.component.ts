import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClientService} from '../../../service/client/client.service';
import {ClientInterface} from '../../../entity/client/client-interface';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientID: string;
  clientData = {
    id: '',
    name: '',
    userName: '',
    password: '',
    email: ''
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private client: ClientService ) { }

  ngOnInit() {
    // Fetch The Client ID
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.clientID = param.get('id');
    });
    // Fetch The Client Data Depends On His ID
    this.client.getClientByClient(this.clientID).subscribe(
        data => {
          if (data) {
            this.clientData.id = `${data.id}`;
            this.clientData.name = data.name;
            this.clientData.userName = data.userName;
            this.clientData.password = data.password;
            this.clientData.email = data.email;
            console.log(this.clientData);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  // Save THe Data After Update It
  myEditSubmit(form) {
      this.client.updateUser(this.clientID, form.value).subscribe(
          (data: ClientInterface) => {
            console.log('request successfully', data);
          },
          error => {
            console.log(error);
          },
          () => {
            this.router.navigate(['admin/list-clients']);
          }
      );
  }
}
