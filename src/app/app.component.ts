import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from './user.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  inputValue = 'all';
  items = User;
  constructor (private dataService: DataService) {}
  ngOnInit(){
    // @ts-ignore
    return this.dataService.getConfig().subscribe(data => this.items = data)
  }
}
