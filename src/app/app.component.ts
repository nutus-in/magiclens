import { Component, LOCALE_ID, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Event, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentals';
  userId = "";
  userName = "";
  jwtToken = "";
  isSessionExists: Boolean = false;

  languages = [
    { code: 'as', label: 'Assamese'},
    { code: 'hi', label: 'Hindi'}
  ];

  constructor(@Inject(LOCALE_ID) protected localeId: string, private router: Router, private activatedRoute: ActivatedRoute,
              private cookieService: CookieService, private location: Location) {}

  ngOnInit() {
    this.userId = this.cookieService.get("currentUserId");
    this.userName = this.cookieService.get("currentUserName");
    this.jwtToken = this.cookieService.get("jwtToken");
    if (this.jwtToken != null && this.jwtToken != "" && this.jwtToken != "undefined") {
      this.isSessionExists = true;

      this.router.navigateByUrl("/home");
    }
    else {
      switch (this.location.path()) {
        case "":
          this.router.navigateByUrl("/rental-items-near-you");
          break;
        case "/rental-items-near-you":
          this.router.navigateByUrl("/rental-items-near-you");
          break;
        case "/login":
          this.router.navigateByUrl("/login");
          break;
        case "/register":
          this.router.navigateByUrl("/register");
          break;
        case "/support/help":
          this.router.navigateByUrl("/support/help");
          break;
        case "/support/policies":
          this.router.navigateByUrl("/support/policies");
          break;
        case "/bugs/report":
          this.router.navigateByUrl("/bugs/report");
          break;
        case "/promotions":
          this.router.navigateByUrl("/promotions");
          break;
        default:
          window.location.href = window.location.origin;
      }
    }
  }
}
