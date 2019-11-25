import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoveService} from '../../service/love.service';

@Component({
  selector: 'app-love',
  templateUrl: './love.component.html',
  styleUrls: ['./love.component.scss']
})
export class LoveComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private loveService: LoveService) {
  }

  ngOnInit() {
    // TODO: Get Love Status
  }

  createLove() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.loveService.createLove(urlSegments[0].path, +urlSegments[0].path);
      }
    );
  }
}
