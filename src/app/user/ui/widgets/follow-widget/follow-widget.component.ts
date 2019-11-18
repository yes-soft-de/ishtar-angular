import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from '../../../service/follow/follow.service';

@Component({
  selector: 'app-follow-widget',
  templateUrl: './follow-widget.component.html',
  styleUrls: ['./follow-widget.component.scss']
})
export class FollowWidgetComponent implements OnInit {
  // TODO: Convert This To Get The Routing Parameter From Active Route, This Way We Can Avoid Inputs
  @Input() ParentType;  // this for entity (painting, artist, ...) number ex:(1: painting)
  @Input() ParentId;    // This is for (painting, artist, ...) id
  followed = false;
  interactionId: number;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    // Fetch THe Follow Request
    this.followService.initFollow(this.ParentType, this.ParentId);
    // Response From Follow Services
    this.followService.getStatusObservable().subscribe(
        (data: { success: boolean, value: any }) => {
          if (data) {
            this.followed = data.success;       // this data = true if success
            if (data.value.interactionID) {     // Response Data After Reload The Page
              this.interactionId = data.value.interactionID;
            } else if (data.value.Data.id) {    // Response Data After Create New Follow
              this.interactionId = data.value.Data.id;
            }
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
