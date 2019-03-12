import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SupportService } from '../../app-service/support.service';
import { Bug } from '../../app-model/bug';

declare var $: any;

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {

  token: any;
  bugData: Bug;
  validationMsg: string;

  constructor(private router: Router, private cookieService: CookieService, private activatedRoute: ActivatedRoute, private supportService: SupportService) { }

  ngOnInit() {
    this.token = this.cookieService.get('jwtToken');
    this.bugData = new Bug();
    $('#liHome').removeClass('active');
    $('#liNotification').removeClass('active');
    $('#liProfile').removeClass('active');
  }

  reportBug() {
    const regTags = /<(.|\n)*?>/g;
    if (regTags.test(this.bugData.desc.toString())) {
      $('#showValidationModal').click();
      this.validationMsg = "HTML tags are not allowed in bug descriptions."
      return;
    }

    this.supportService.reportBug(this.token, this.bugData).subscribe(res => {
      if (res.status == 201) {
        this.router.navigateByUrl("/bugs/logged");
      }
      else {  
        this.router.navigateByUrl("/error");
      }
    });
  }

}
