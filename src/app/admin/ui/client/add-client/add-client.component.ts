import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../service/client/client.service';
import {Client} from '../../../entity/client/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  constructor(private client: ClientService) { }

  ngOnInit() {
  }

  mySubmit(form) {
    const client: Client = new Client();
    // TODO inserting new real data
    client.name = form.value.name;
    client.userName = form.value.userName;
    client.password = form.value.password;
    client.email = form.value.email;
    console.log(client);
    this.client.postAddClient(client);
    // TODO insert ngx-toastr Message
  }

}
