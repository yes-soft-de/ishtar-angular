import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IshtarInteractionService } from 'src/app/user/service/ishtar-interaction/ishtar-interaction.service';
import { UserProfileResponse } from 'src/app/user/entity-protected/profile/user-profile-response';
import { UserProfileManagerService } from 'src/app/user/manager/user-profile/user-profile-manager.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss','../../components/statue-list/statue-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ProfilePageComponent implements OnInit {
  magnifyingImage = false;
  public userProfileInfo: UserProfileResponse;

  constructor(private interactionService: IshtarInteractionService,
    private userProfileManager: UserProfileManagerService) { }

  ngOnInit() {
    const eventHandler = new Subject<UserProfileResponse>();

    eventHandler.subscribe(
      data => {
        this.userProfileInfo = data;
      }, error => {
        console.log(error);
      }
    )

    this.userProfileManager.getUserProfile(eventHandler)
  }

  choseTab(event){
    var tab_id = event.target.id;
    var active = document.getElementById(tab_id).classList.contains('active');
    var active_block = document.getElementById(tab_id).id;
    active_block = active_block.slice(0,-3) + 'list';
    if (!active){
      var tab_options = document.getElementsByClassName("tab-option");
      Array.prototype.forEach.call(tab_options, function(el) {
        if(el.classList.contains('active')){
          el.classList.remove('active');
          document.getElementById(tab_id).classList.add('active');
        }
      });
      var results_block = document.getElementsByClassName("results-block");
      Array.prototype.forEach.call(results_block, function(el) {
        if(el.classList.contains('active')){
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
