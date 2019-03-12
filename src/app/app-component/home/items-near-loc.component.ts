import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../app-service/auth.service';

declare var $: any;

@Component({
  selector: 'app-items-near-loc',
  templateUrl: './items-near-loc.component.html',
  styleUrls: ['./items-near-loc.component.css']
})
export class ItemsNearLocComponent implements OnInit {

  jwtToken = "";
  siteVisited: Number;

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.jwtToken = this.cookieService.get("jwtToken");
    if (this.jwtToken != null && this.jwtToken != "" && this.jwtToken != "undefined") {
      this.router.navigateByUrl("/home");
    }

    $('#liLogin').removeClass('active');
    $('#liRegister').removeClass('active');

    this.loadSite();
  }

  loadSite() {
    this.authService.loadSite().subscribe(res => {
      if (res.status = 200) {
        console.log("Site Loaded")
        this.siteVisited = res.json()["count"];
      }
    });
  }

}
