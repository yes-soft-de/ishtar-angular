import { Component, Input, OnInit } from '@angular/core';
import { LoveService } from '../../service/love.service';
import { InteractionConstantService } from '../../../../interactions/service/interaction-constant.service';

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
    this.loveService.postLove(this.ParentType, this.ParentId, InteractionConstantService.INTERACTION_TYPE_LOVE).subscribe(
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
