import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  token: any;
  @Output() changed = new EventEmitter<string>();
  @Output() clicked = new EventEmitter<string>();

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.token = this.cookieService.get('jwtToken');
  }

  search(search_place, search_product) {
    let searchData = JSON.stringify({"search_place": search_place, "search_product": search_product});
    this.clicked.emit(searchData);
  }

  searchTextChanged(search_place, search_product) {
    let searchData = JSON.stringify({"search_place": search_place, "search_product": search_product});
    this.changed.emit(searchData);
  }

}
