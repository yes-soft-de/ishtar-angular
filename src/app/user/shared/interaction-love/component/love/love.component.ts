import {Component, Input, OnInit} from '@angular/core';
import {LoveService} from '../../service/love.service';
import {InteractionConstantService} from '../../../../interactions/service/interaction-constant.service';

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

  constructor(private loveService: LoveService) {}

  ngOnInit() {
    // Fetch THe Follow Request
    this.loveService.initLove(this.ParentType, this.ParentId);
    // Response From Love Services
    this.loveService.getLoveObservable().subscribe(
        (loveResponse: { Data: {interactions: number} }) => {
          if (loveResponse) {
            if (loveResponse.Data.interactions > 0) {
              this.loved = true;
            }
          } else {  // If Not Data That Mean This Interaction Was Deleted
            this.loving = false;
            this.loved = false;
          }
        }
    );
  }

  // Send love interactionTypeString
  sendLove() {
    console.log(`Sending Some Love Buddy ;)`);
    this.loveService.postLove( this.ParentType, this.ParentId, InteractionConstantService.INTERACTION_TYPE_LOVE).subscribe(
      (lovePostResult: any) => {
        console.log(JSON.stringify(lovePostResult));
        if (lovePostResult.success) {
          this.loved = true;
        }
      }
    );
  }

  // delete the love interactionTypeString
  deleteLove() {
    this.loving = true;
    this.loveService.deleteLoveInteraction(this.interactionId);
  }
}
