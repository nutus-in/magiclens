import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../app-service/auth.service';
import { DataServiceService } from '../../app-service/data-service.service';
import { Profile } from '../../app-model/profile';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  token: any;
  profile: Profile;
  validationMsg: string;

  constructor(private router: Router, private coookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    $('#liHome').removeClass('active');
    $('#liProfile').addClass('active');
    this.token = this.coookieService.get('jwtToken');
    this.profile = new Profile();
    this.getUserSettings();
  }

  getUserSettings() {
    this.authService.getUserSettings(this.token).subscribe(res => {
      if (res.status == 200) {
        let settingsData = res.json();
        this.profile = settingsData;
      }
    });
  }

  updateUserSettings() {
    const regTags = /<(.|\n)*?>/g;
    if (regTags.test(this.profile.address.toString())) {
      $('#showValidationModal').click();
      this.validationMsg = "HTML tags are not allowed in address."
      return;
    }

    this.authService.updateUserSettings(this.token, this.profile).subscribe(res => {
      if (res.status == 204) {
        console.log("Profile settings updated");
        this.profile = null;
        this.profile = new Profile();
        this.getUserSettings();
        // Show success modal
        $('#successModal').click();
      }
      else {
        // Show failure modal
        $('#failureModal').click();
      }
    });
  }

  activateDeactivateProfile() {
    this.authService.activateDeactivateProfile(this.token).subscribe(res => {
      if (res.status == 204) {
        console.log("Profile activated/deactivated");
        this.profile = null;
        this.profile = new Profile();
        this.getUserSettings();
      }
    });
  }

  gotoProfile() {
    this.router.navigateByUrl('/profile');
  }

}
