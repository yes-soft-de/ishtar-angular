import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from '../../service/follow.service';
import {InteractionConstantService} from '../../../../interactions/service/interaction-constant.service';
import { EMPTY } from 'rxjs';
import { InteractionConsts } from 'src/app/user/interactions/statics/interaction-consts';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() ParentType: string;  // this for entity (painting, artist, ...) number ex:(1: painting)
  @Input() ParentId: number;    // This is for (painting, artist, ...) id
  followed = false;
  following = false;
  interactionId: number;

  parentCode = -1;

  constructor(private followService: FollowService) { }

  ngOnInit() {
    this.getIsFollowing();
    switch (this.ParentType.toLowerCase()) {
      case 'painting':
        this.parentCode = InteractionConsts.ENTITY_TYPE_PAINTING;
        break;
      case 'artist':
        this.parentCode = InteractionConsts.ENTITY_TYPE_ARTIST;
        break;
      case 'arttype':
        this.parentCode = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      case 'art-type':
        this.parentCode = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      case 'art_type':
        this.parentCode = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      case 'statue':
        this.parentCode = InteractionConsts.ENTITY_TYPE_STATUE;
        break;
      default:
        break;
    }
  }

  getIsFollowing() {
    // Fetch THe Follow Request
    this.followService.getIsFollowed(this.ParentType, this.ParentId).subscribe(
      isFollowed => {
        this.followed = isFollowed > 0;
        this.interactionId = isFollowed;
      }
    );
  }

  // Start Following
  startFollow() {
    if (this.parentCode > 0){
      this.followService.postFollow(this.parentCode, this.ParentId).subscribe(
        () => {
          this.getIsFollowing();
        }
      );
    }
  }

  // Stop Following
  stopFollow() {
    this.followService.deleteFollowInteraction(this.interactionId).subscribe(
      () => {
        this.getIsFollowing();
      }
    );
  }
}
