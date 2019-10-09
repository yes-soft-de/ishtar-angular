import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from '../../../service/follow/follow.service';

@Component({
  selector: 'app-follow-widget',
  templateUrl: './follow-widget.component.html',
  styleUrls: ['./follow-widget.component.scss']
})
export class FollowWidgetComponent implements OnInit {
  @Input() ParentType;  // this for entity (painting, artist, ...) number ex:(1: painting)
  @Input() ParentId;    // This is for (painting, artist, ...) id
  @Input() EntityName;  // this is for entity table name

  followed = false;
  interactionId: number;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.followService.initFollow(this.EntityName, this.ParentId);
    this.followService.getStatusObservable().subscribe(
        (data: { success: boolean, value: any }) => {
          if (data) {
            this.followed = data.success;  // this data = true if success
            this.interactionId = data.value.interactionID;
            console.log('Interaction Response : ', data);
          } else {
            this.followed = false;
          }
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
    this.followService.deleteFollowInteraction(this.interactionId);
  }
}
