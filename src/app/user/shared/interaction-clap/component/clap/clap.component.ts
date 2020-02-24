import {Component, Input, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ClapService} from '../../service/clap.service';
import { InteractionConstantService } from 'src/app/user/interactions/service/interaction-constant.service';
import { InteractionConsts } from 'src/app/user/interactions/statics/interaction-consts';

@Component({
  selector: 'app-clap',
  templateUrl: './clap.component.html',
  styleUrls: ['./clap.component.scss']
})
export class ClapComponent implements OnInit {
  @Input() ParentType: string;
  @Input() ParentId: number;
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
    this.getClaps();
  }

  getClaps() {
    this.clapService.getClientClap(this.ParentId).subscribe(
      clapsEntity => {
        if (clapsEntity) {
          if (clapsEntity.value > 0) {
            this.clapped = true;
            this.clappedNumber = clapsEntity.value;

            this.clapId = clapsEntity.clapId;
          }
        }
      }
    );
  }

  sendClap(value: number) {
    console.log(`Sending Some Claps Buddy ;)`);
    let interactionType = -1;
    switch (this.ParentType.toLowerCase()) {
      case 'painting':
        interactionType = InteractionConsts.ENTITY_TYPE_PAINTING;
        break;
      case 'statue':
        interactionType = InteractionConsts.ENTITY_TYPE_STATUE;
        break;
      case 'artist':
        interactionType = InteractionConsts.ENTITY_TYPE_ARTIST;
        break;
      case 'arttype':
        interactionType = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      case 'art-type':
        interactionType = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      case 'art_type':
        interactionType = InteractionConsts.ENTITY_TYPE_ART_TYPE;
        break;
      default:
        console.log('Error, unindetified parent type :(');
    }

    this.clapService.postClap(interactionType, this.ParentId, value).subscribe(
      () => {
        this.getClaps();
      }
    );

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
