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
  interactionID: number;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.initFollow(this.ParentId, this.ParentType);
    this.followService.getStatusObservable().subscribe(
      data => {
        this.followed = data;
      }
    );
  }
  // Start Following
  startFollow() {
    console.log(`Sending Some Love Buddy ;)`);
    this.followService.postFollow(this.ParentId, this.ParentType);
  }

  // Stop Following
  stopFollow() {
    console.log('Send delete Follow Request');
    this.followService.deleteFollowInteraction(this.interactionID);
  }
}
