import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pre',
  templateUrl: './pre.component.html',
  styleUrls: ['./pre.component.scss']
})
export class PreComponent implements OnInit {
  pre: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        console.log(`Current Url Query ${urlSegments[0].path}`);
        this.pre = urlSegments[0].path;
      }
    );
  }

}
