import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IshtarInteractionService} from 'src/app/user/service/ishtar-interaction/ishtar-interaction.service';
import {UserProfileManagerService} from 'src/app/user/manager/user-profile/user-profile-manager.service';
import {Router} from '@angular/router';
import {UserInfo} from '../../../entity-protected/profile/user-info';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {
  magnifyingImage = false;
  public userProfileInfo: UserInfo;

  constructor(private interactionService: IshtarInteractionService,
              private userProfileManager: UserProfileManagerService,
              private router: Router) {
  }

  ngOnInit() {
    this.userProfileManager.getManagerObservable().subscribe(
      data => {
        this.userProfileInfo = data;
      }, error1 => {
        // TODO Implement A Way To Handle Unauthorized Profile Access
        this.router.navigate(['/']);
      }
    );

    this.userProfileManager.getUserProfile();
  }

  choseTab(event) {
    const tabId = event.target.id;
    const active = document.getElementById(tabId).classList.contains('active');
    let activeBlock = document.getElementById(tabId).id;
    activeBlock = activeBlock.slice(0, -3) + 'list';
    if (!active) {
      const tabOptions = document.getElementsByClassName('tab-option');
      Array.prototype.forEach.call(tabOptions, (el) => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          document.getElementById(tabId).classList.add('active');
        }
      });
      const resultsBlock = document.getElementsByClassName('results-block');
      Array.prototype.forEach.call(resultsBlock, (el) => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          document.getElementById(activeBlock).classList.add('active');
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
