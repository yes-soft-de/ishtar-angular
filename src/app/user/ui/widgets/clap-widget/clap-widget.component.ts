import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../../UserConfig';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {ToastrService} from 'ngx-toastr';
import {ClapService} from '../../../service/clap/clap.service';

@Component({
  selector: 'app-clap-widget',
  templateUrl: './clap-widget.component.html',
  styleUrls: ['./clap-widget.component.scss']
})
export class ClapWidgetComponent implements OnInit {
  clapFiled = '../../../../../assets/clap-icon.svg';
  clapOutlined = '../../../../../assets/clap-outline.svg';

  activated = false;
  @Input() itemType;
  @Input() itemId;

  constructor(private userProfiler: UserProfileService, private clapService: ClapService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
  }

  sendClap() {
    this.userProfiler.requestUserDetails().subscribe(
      data => {
        if (data.Data.username === undefined) {
          // This should Open Dialog for Login
          this.toaster.info('Please Login First');
        } else {
          this.clapService.sendClap(this.itemId, data.Data.id);
        }
      }
    );
  }

  getClap() {

  }
}
