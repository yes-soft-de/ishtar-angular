import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from '../../../service/follow/follow.service';

@Component({
  selector: 'app-follow-widget',
  templateUrl: './follow-widget.component.html',
  styleUrls: ['./follow-widget.component.scss']
})
export class FollowWidgetComponent implements OnInit {
  @Input() ParentType;
  @Input() ParentId;

  followed = false;
  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.initFollow(this.ParentId, this.ParentType);
    this.followService.getStatusObservable().subscribe(
      data => {
        this.followed = data;
      }
    );
  }
  startFollow() {
    console.log(`Sending Some Love Buddy ;)`);
    this.followService.postFollow(this.ParentId, this.ParentType);
  }
}
