import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  token: any;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.token = this.cookieService.get('jwtToken');
  }

  openBugReportForm() {
    if(this.token == "" || this.token == null) {
      this.router.navigateByUrl("/login");
      $('#btnInfoModal').click();
    }
    else {
      this.router.navigateByUrl("/bugs/report");
    }
  }

}
