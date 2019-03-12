import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../app-service/auth.service';
import { DataServiceService } from '../../app-service/data-service.service';
import { Profile } from '../../app-model/profile';
import { Metric } from '../../app-model/metric';

declare var $: any;

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  token: any;
  profile: Profile;
  metric: Metric

  constructor(private coookieService: CookieService, private authService: AuthService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.token = this.coookieService.get('jwtToken');
    $('#liNotification').removeClass('active');
    $('#liHome').removeClass('active');
    $('#liProfile').addClass('active');
    this.profile = new Profile();
    this.metric = new Metric();
    this.getUserSettings();
    this.getMetricData();
  }

  getUserSettings() {
    this.authService.getUserSettings(this.token).subscribe(res => {
      if (res.status == 200) {
        let settingsData = res.json();
        this.profile = settingsData;
        if (settingsData["company"] == null) {
          this.profile.company = "Where do you work?";
        }
        if (settingsData["obsession"] == null) {
          this.profile.obsession = "Update your obsession. E.g., Photography, Travel etc.";
        }
        if (settingsData["desc"] == null) {
          this.profile.desc = "Tell something about yourself. E.g., Profession, Passion etc.";
        }
      }
    });
  }

  getMetricData() {
    this.dataService.getUserMetrics(this.token).subscribe(res => {
      if (res.status == 200) {
        this.metric = res.json();
      }
    });
  }

}
