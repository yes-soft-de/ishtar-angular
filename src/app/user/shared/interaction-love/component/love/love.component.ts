import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoveService} from '../../service/love.service';

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
    this.loveService.getStatusObservable().subscribe(
        (data: { success: boolean, value: any }) => {
          if (data) {
            this.loved = data.success;  // this data = true if success
            if (data.value.interactionID) {     // Response Data After Reload The Page
              this.interactionId = data.value.interactionID;
            } else if (data.value.Data.id) {    // Response Data After Create New Love
              this.interactionId = data.value.Data.id;
            }
            console.log('Interaction Response : ', data);
          } else {
            this.loved = false;
          }
        }
    );
  }

  // Send love interaction
  sendLove() {
    console.log(`Sending Some Love Buddy ;)`);
    this.loveService.postLove(this.ParentId, this.ParentType);
  }

  // delete the love interaction
  deleteLove() {
    console.log('Send delete Love Request');
    this.loveService.deleteLoveInteraction(this.interactionId);
  }
}