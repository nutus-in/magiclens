import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../app-service/auth.service';
import { DataServiceService } from '../../app-service/data-service.service';

@Component({
  selector: 'app-session-header',
  templateUrl: './session-header.component.html',
  styleUrls: ['./session-header.component.css']
})
export class SessionHeaderComponent implements OnInit {

  @Input() isSessionExists: Boolean;
  @Input() userName: String;
  token: any;
  notificationCount: Number = 0;

  constructor(private router: Router, private coookieService: CookieService, private authService: AuthService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.token = this.coookieService.get('jwtToken');
    this.getUserNotificationCount();
  }

  getUserNotificationCount() {
    this.dataService.getNotificationCount(this.token).subscribe(res => {
      if (res.status == 200) {
        this.notificationCount = res.json()["count"];
      }
    });
  }

  loadNotifications() {
    this.notificationCount = 0;
    this.router.navigateByUrl("/profile/notifications");
  }

  logOut() {
    this.authService.logout();
    window.location.href = window.location.origin;
  }
}
