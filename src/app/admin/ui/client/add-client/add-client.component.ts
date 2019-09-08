import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../service/client/client.service';
import {Client} from '../../../entity/client/client';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  constructor(private client: ClientService) { }

  ngOnInit() {
  }


}
