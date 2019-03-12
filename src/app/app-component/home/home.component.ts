import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jwtToken = "";

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.jwtToken = this.cookieService.get("jwtToken");
    if (this.jwtToken == null || this.jwtToken == "" || this.jwtToken == "undefined") {
      window.location.href = window.location.origin;
    }

    $('#liNotification').removeClass('active');
    $('#liProfile').removeClass('active');
    $('#liHome').addClass('active');
  }

}
