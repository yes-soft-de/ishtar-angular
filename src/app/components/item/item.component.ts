import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {
  item;
  id;
  apiUrl = 'http://jsonplaceholder.typicode.com/photos/';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.paramMap.subscribe(params => params.get('id'));
    // this.route.paramMap.source._value.id
    console.log(this.route.paramMap.subscribe());
    // return this.httpClient.get(this.apiUrl + this.id).subscribe(data => (this.item = data));
  }

}
