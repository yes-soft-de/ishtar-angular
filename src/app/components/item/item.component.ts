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
  apiUrl = 'http://jsonplaceholder.typicode.com/photos/';

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.httpClient.get(this.apiUrl + params.get('id')).subscribe(data => this.item = data);
    });
  }

}
