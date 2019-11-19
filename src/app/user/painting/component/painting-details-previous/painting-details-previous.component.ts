import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-painting-details-previous',
  templateUrl: './painting-details-previous.component.html',
  styleUrls: ['./painting-details-previous.component.scss']
})
export class PaintingDetailsPreviousComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        console.log(`Current Url Query ${urlSegments[0].path}`);
      }
    );
  }

}
