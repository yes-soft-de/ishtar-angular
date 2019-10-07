import {Component, Input, OnInit} from '@angular/core';
import {ClapService} from '../../../service/clap/clap.service';
import {UserInfo} from '../../../entity/user/user-info';
import {interval, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {isBoolean} from 'util';

@Component({
  selector: 'app-clap-widget',
  templateUrl: './clap-widget.component.html',
  styleUrls: ['./clap-widget.component.scss']
})
export class ClapWidgetComponent implements OnInit {
  clapFiled = '../../../../../assets/clap-icon.svg';
  clapOutlined = '../../../../../assets/clap-outline.svg';

  clapIconSize = 32;

  @Input() ParentType;
  @Input() ParentId;

  clapped = false;
  clappedNumber = null;

  timeStart: Date;
  source = interval(100);
  holding = false;

  subscription;

  constructor(private clapService: ClapService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.ObserveClaps();
  }

  ObserveClaps() {
    this.clapService.initClap(this.ParentId, this.ParentType);
    this.clapService.getStatusObservable().subscribe(
      data => {
        this.clapped = data > 0;
        if (this.clapped) {
          this.clappedNumber = data;
        }
      }
    );
  }

  sendClap(value) {
    console.log(`Sending Some Claps Buddy ;)`);
    this.clapService.postClap(this.ParentId, this.ParentType, value);
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
    console.log(Math.abs(timeDiff));
    this.holding = false;
    const clapsNumber = this.calculateClaps();
    this.toaster.success(`Sending ${clapsNumber} to Painting`);
    this.clapIconSize = 32;

    this.sendClap(clapsNumber);
  }

  public calculateClaps(): number {
    return parseInt(`${((this.clapIconSize - 32) / 50) * 100}`, 10);
  }
}
