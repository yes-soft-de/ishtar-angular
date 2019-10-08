import {Component, Input, OnInit} from '@angular/core';
import {LoveService} from '../../../service/love/love.service';

@Component({
  selector: 'app-love-interaction',
  templateUrl: './love-widget.component.html',
  styleUrls: ['./love-widget.component.scss']
})
export class LoveWidgetComponent implements OnInit {
  @Input() ParentType;
  @Input() ParentId;

  loved = false;
  interactionID: number;

  constructor(private loveService: LoveService) {}

  ngOnInit() {
    // this.loveService.getClientInteraction(4).subscribe(
    //     data => {
    //       console.log('Interactions : ', data);
    //     }, error => {
    //       console.log(error);
    //     }
    // );
    this.loveService.initLove(this.ParentId, this.ParentType);
    this.loveService.getStatusObservable().subscribe(
      data => {
        this.loved = data;
        console.log('Response from love-widget.ts: ', data);
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
    this.loveService.deleteLoveInteraction(this.interactionID);
  }
}
