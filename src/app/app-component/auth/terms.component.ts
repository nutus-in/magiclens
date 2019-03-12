import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#liLogin').removeClass('active');
    $('#liRegister').removeClass('active');
    $('#liAdvertisement').removeClass('active');
    $('#liHome').removeClass('active');
    $('#liNotification').removeClass('active');
    $('#liProfile').removeClass('active');
  }

}
