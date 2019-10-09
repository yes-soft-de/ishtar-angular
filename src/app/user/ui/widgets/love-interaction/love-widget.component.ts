import {Component, Input, OnInit} from '@angular/core';
import {LoveService} from '../../../service/love/love.service';
import {UserConfig} from '../../../UserConfig';

@Component({
  selector: 'app-love-interaction',
  templateUrl: './love-widget.component.html',
  styleUrls: ['./love-widget.component.scss']
})
export class LoveWidgetComponent implements OnInit {
  @Input() ParentType;  // this for entity number (1: painting)
  @Input() ParentId;    // This is for painting id
  @Input() EntityName;  // this is for entity table name

  loved = false;
  interactionId: number;

  constructor(private loveService: LoveService) {}

  ngOnInit() {
    // this.loveService.getClientInteraction(4, this.EntityName, this.ParentId);
    this.loveService.initLove(this.EntityName, this.ParentId);
    this.loveService.getStatusObservable().subscribe(
        (data: { success: boolean, value: any }) => {
          if (data) {
            this.loved = data.success;  // this data = true if success
            this.interactionId = data.value.interactionID;
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
