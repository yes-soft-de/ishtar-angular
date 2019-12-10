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
  interactionId: number;

  constructor(private loveService: LoveService) {}

  ngOnInit() {
    // Fetch THe Follow Request
    this.loveService.initLove(this.ParentType, this.ParentId);
    // Response From Love Services
    this.loveService.getLoveObservable().subscribe(
        (loveResponse: { success: boolean, value: any }) => {
          // Check If There Is Data Or Not Return From The Server
          if (loveResponse) {
            if (loveResponse.value.interaction == InteractionConstantService.INTERACTION_TYPE_LOVE ||
              loveResponse.value.interaction.name == InteractionConstantService.INTERACTION_TYPE_LOVE) {
              this.loved = loveResponse.success;  // this loveResponse = true if success
              if (loveResponse.value.interactionID) {     // Response loveResponse After Reload The Page
                this.interactionId = loveResponse.value.interactionID;
              } else if (loveResponse.value.id) {         // Response loveResponse After Create New Love
                this.interactionId = loveResponse.value.id;
              }
              console.log('Love Interaction Response : ', loveResponse);
            } else {
              return;
            }
          } else {  // If Not Data That Mean This Interaction Was Deleted
            this.loved = false;
          }
        }
    );
  }

  // Send love interaction
  sendLove() {
    console.log(`Sending Some Love Buddy ;)`);
    this.loveService.postLove( this.ParentType, this.ParentId, InteractionConstantService.INTERACTION_TYPE_LOVE);
  }

  // delete the love interaction
  deleteLove() {
    this.loveService.deleteLoveInteraction(this.interactionId);
  }
}
