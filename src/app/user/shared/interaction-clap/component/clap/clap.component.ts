import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ClapService} from '../../service/clap.service';
import { InteractionConstantService } from 'src/app/user/interactions/service/interaction-constant.service';

@Component({
  selector: 'app-clap',
  templateUrl: './clap.component.html',
  styleUrls: ['./clap.component.scss']
})
export class ClapComponent implements OnInit {
  @Input() ParentType;
  @Input() ParentId;
  clapFiled = '../../../../../assets/clap-icon.svg';
  clapOutlined = '../../../../../assets/clap-outline.svg';
  clapIconSize = 32;
  clapped = false;        // clap active
  clappedNumber = null;   // Storing clap number
  clapping = false;       // For Reduce The clap image Opacity Until finish Delete Clap Request
  timeStart: Date;
  source = interval(100);
  holding = false;
  clapId: number;         // Storing clap id
  subscription;

  constructor(private clapService: ClapService) {}

  ngOnInit() {
    this.ObserveClaps();
  }

  ObserveClaps() {
    // Fetch THe Clap Request
    this.clapService.initClap(this.ParentType, this.ParentId);
    // Response From Clap Services
    this.clapService.getClapObservable().subscribe(
        (clapResponse: { success: boolean, value: any }) => {
          // Check If There Is Data Or Not Return From The Server
          if (clapResponse) {
            // Check If the Reponse Interaction Not follow And Love | Then Will Be Clap
            if (clapResponse.value.interactionTypeString != InteractionConstantService.INTERACTION_TYPE_LOVE &&
                clapResponse.value.interactionTypeString != InteractionConstantService.INTERACTION_TYPE_FOLLOW) {
              this.clapped = clapResponse.success;  // this clapResponse = true if success
              if (clapResponse.value.ClapID) {      // Response clapResponse After Reload The Page
                this.clapId = clapResponse.value.ClapID;
                this.clappedNumber = clapResponse.value.value;
              } else if (clapResponse.value.Data.id) {  // Response  After Create New Clap
                this.clapId = clapResponse.value.Data.id;
                this.clappedNumber = clapResponse.value.Data.value;
              }
            } else {
              return;
            }
          } else {  // If Not Data That Mean This Interaction Was Deleted
            this.clapping = false;
            this.clapped = false;
          }
        }
    );
  }

  sendClap(value) {
    console.log(`Sending Some Claps Buddy ;)`);
    this.clapService.postClap(this.ParentType, this.ParentId, value);
  }

  startCalc() {
    this.holding = true;
    this.timeStart = new Date();
    this.subscription = this.source.subscribe(() => {
      if (this.holding) {
        if (this.clapIconSize < 64) {
          this.clapIconSize = this.clapIconSize + 1;
        }
      }
    });
  }

  endClac() {
    const timeEnd = new Date();
    const timeDiff = (timeEnd.getMilliseconds() - this.timeStart.getMilliseconds()) / 1000;
    // console.log(Math.abs(timeDiff));
    this.holding = false;
    const clapsNumber = this.calculateClaps();
    this.clapIconSize = 32;

    this.sendClap(clapsNumber);
  }

  public calculateClaps(): number {
    return parseInt(`${((this.clapIconSize - 32) / 50) * 100}`, 10);
  }

  deleteClap() {
    this.clapping = true;
    this.clapService.deleteClapInteraction(this.clapId);
  }
}
