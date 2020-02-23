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
  following = false;
  interactionId: number;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    // Fetch THe Follow Request
    this.followService.getIsFollowed(this.ParentType, this.ParentId).subscribe(
      isFollowed => {
        this.followed = isFollowed;
      }
    );
  }
  // Start Following
  startFollow() {
    this.followService.postFollow(this.ParentType, this.ParentId, InteractionConstantService.INTERACTION_TYPE_FOLLOW);
  }

  // Stop Following
  stopFollow() {
    this.following = true;
    this.followService.deleteFollowInteraction(this.interactionId);
  }
}
