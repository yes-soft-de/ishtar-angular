import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {IshtarInteractionService} from 'src/app/user/service/ishtar-interaction/ishtar-interaction.service';
import {StatueDetailInterface} from 'src/app/user/entity/statue/statue-detail-interface';
import {UserManagerService} from '../../../manager/user/user-manager.service';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {UserInfo} from '../../../entity/user/user-info';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss', '../../components/statue-list/statue-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {
  magnifyingImage = false;
  userInfo: UserInfo;
  constructor(private interactionService: IshtarInteractionService,
              private userManager: UserManagerService,
              private oldUserService: UserProfileService,
              private route: Router) {
  }

  ngOnInit() {
    this.oldUserService.requestUserDetails().subscribe(
      data => {
        this.userInfo = data.Data;
        if (data.Data.id === null) {
          this.route.navigate(['/']);
        }
      }
    );
  }

  choseTab(event) {
    var tab_id = event.target.id;
    var active = document.getElementById(tab_id).classList.contains('active');
    var active_block = document.getElementById(tab_id).id;
    active_block = active_block.slice(0, -3) + 'list';
    if (!active) {
      var tab_options = document.getElementsByClassName("tab-option");
      Array.prototype.forEach.call(tab_options, function (el) {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          document.getElementById(tab_id).classList.add('active');
        }
      });
      var results_block = document.getElementsByClassName("results-block");
      Array.prototype.forEach.call(results_block, function (el) {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          document.getElementById(active_block).classList.add('active');
        }
      });

    }
  }

  MagnifyingImage(event) {
    const BTN_NUMBER = event.target.name;
    const INFO_ID: string = 'info_' + BTN_NUMBER;
    console.log(BTN_NUMBER);
    if (this.magnifyingImage) {
      document.getElementById(INFO_ID).style.display = 'block';
      this.magnifyingImage = false;
    } else {
      document.getElementById(INFO_ID).style.display = 'none';
      this.magnifyingImage = true;
    }
  }

  viewStatue(statueId: number) {
    this.interactionService.addViewInteraction(statueId, 'statue');
  }

}
