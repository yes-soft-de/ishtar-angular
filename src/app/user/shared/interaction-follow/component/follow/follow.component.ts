import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from '../../service/follow.service';
import {InteractionConstantService} from '../../../../interactions/service/interaction-constant.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() ParentType;  // this for entity (painting, artist, ...) number ex:(1: painting)
  @Input() ParentId;    // This is for (painting, artist, ...) id
  followed = false;
  interactionId: number;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    // Fetch THe Follow Request
    this.followService.initFollow(this.ParentType, this.ParentId);
    // Response From Follow Services
    this.followService.getFollowObservable().subscribe(
        (followResponse: { success: boolean, value: any }) => {
          // Check If There Is Data Or Not Return From The Server
          if (followResponse) {
            if (followResponse.value.interaction == InteractionConstantService.INTERACTION_TYPE_FOLLOW ||
              followResponse.value.interaction.name == InteractionConstantService.INTERACTION_TYPE_FOLLOW) {
              this.followed = followResponse.success;       // this followResponse = true if success
              if (followResponse.value.interactionID) {     // Response followResponse After Reload The Page
                this.interactionId = followResponse.value.interactionID;
              } else if (followResponse.value.id) {    // Response followResponse After Create New Follow
                this.interactionId = followResponse.value.id;
              }
            } else {
              return EMPTY;
            }
          } else {  // If Not Data That Mean This Interaction Was Deleted
            this.followed = false;
          }
        }
    );
  }
  // Start Following
  startFollow() {
    console.log(`Sending Some Follow Buddy ;)`);
    this.followService.postFollow(this.ParentType, this.ParentId, InteractionConstantService.INTERACTION_TYPE_FOLLOW);
  }

  // Stop Following
  stopFollow() {
    this.followService.deleteFollowInteraction(this.interactionId);
  }
}
