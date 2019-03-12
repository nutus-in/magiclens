import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

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
