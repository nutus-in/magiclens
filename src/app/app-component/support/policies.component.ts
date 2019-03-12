import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

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
