import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#liPromotion').addClass('active');
    $('#liLogin').removeClass('active');
    $('#liRegister').removeClass('active');
  }

}
