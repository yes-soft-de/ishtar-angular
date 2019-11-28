import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextComponent implements OnInit {
  next: number;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        console.log(`Current Url Query ${urlSegments[0].path}`);
        this.next = +urlSegments[1].path + 1;
      }
    );
  }

}
