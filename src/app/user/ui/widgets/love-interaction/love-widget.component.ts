import {Component, Input, OnInit} from '@angular/core';
import {LoveService} from '../../../service/love/love.service';

@Component({
  selector: 'app-love-interaction',
  templateUrl: './love-widget.component.html',
  styleUrls: ['./love-widget.component.scss']
})
export class LoveWidgetComponent implements OnInit {
  @Input() ParentType;
  @Input() ParentId;

  loved = false;

  constructor(private loveService: LoveService) {
  }

  ngOnInit() {
    this.loveService.initLove(this.ParentId, this.ParentType);
    this.loveService.getStatusObservable().subscribe(
      data => {
        this.loved = data;
      }
    );
  }

  sendLove() {
    console.log(`Sending Some Love Buddy ;)`);
    this.loveService.postLove(this.ParentId, this.ParentType);
  }
}
