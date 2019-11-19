import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-painting-details-next',
  templateUrl: './painting-details-next.component.html',
  styleUrls: ['./painting-details-next.component.scss']
})
export class PaintingDetailsNextComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        console.log(`Current Url Query ${urlSegments[0].path}`);
      }
    );
  }

}
