import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  whatsAppLink = 'https://wa.me/491633733146?text=I\'m%20interested%20in%20Painting';
  footerHeight: number;

  constructor(private router: Router, private googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit() {
    // Get Bottom Footer height
    this.footerHeight = document.getElementById('custom-id-bottom-footer').offsetHeight;
  }

  async navigateToWhatsApp() {
    await this.googleAnalyticsService.event('CONTACT_REQUEST');
    await this.router.navigate([this.whatsAppLink]);
  }
}
