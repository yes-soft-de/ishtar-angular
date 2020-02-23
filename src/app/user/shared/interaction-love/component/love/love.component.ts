import { Component, Input, OnInit } from '@angular/core';
import { LoveService } from '../../service/love.service';
import { InteractionConstantService } from '../../../../interactions/service/interaction-constant.service';
import { InteractionConsts } from 'src/app/user/interactions/statics/interaction-consts';

@Component({
  selector: 'app-love',
  templateUrl: './love.component.html',
  styleUrls: ['./love.component.scss']
})
export class LoveComponent implements OnInit {
  @Input() ParentType;  // this for entity number (1: painting)
  @Input() ParentId;    // This is for painting id
  loved = false;
  loving = false;
  interactionId: number;

  parentCode = -1;

  constructor(private loveService: LoveService) { }

  ngOnInit() {
    // Response From Love Services
    this.loveService.getLoveStatus(this.ParentType, this.ParentId).subscribe(
      isLoved => {
        console.log(isLoved);
        if (isLoved > 0) {
          this.loved = true;
        } else {
          this.loved = false;
          this.loving = false;
        }
      }
    );
  }

  sendLove() {
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
    this.loveService.postLove(this.parentCode, this.ParentId, `${InteractionConsts.INTERACTION_TYPE_LOVE}`).subscribe(
      lovePostResult => {
        this.loved = lovePostResult;
      }
    );
  }

  // delete the love interactionTypeString
  deleteLove() {
    this.loving = true;
    this.loveService.deleteLoveInteraction(this.interactionId);
  }
}
