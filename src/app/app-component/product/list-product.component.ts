import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../app-service/auth.service';
import { DataServiceService } from '../../app-service/data-service.service';
import { Product } from '../../app-model/product';
import { Profile } from 'src/app/app-model/profile';
import { Rental } from 'src/app/app-model/rental';

declare var $: any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  token: any;
  productsData: Array<Product> = [];
  imagesUrl: Array<any> = [];
  owner: Profile;
  rental: Rental;
  rentingProductId: number;
  rentingProductPrice: number;
  hasProductImages: boolean;
  todayDate:any = new Date();
  isToDateFromPast: boolean = false;
  isIDProofSelected: boolean = true;
  isUpcomingOngoingRentalRequestExists: boolean = false;
  existingRentalRequestValidationMessage: string;
  infoLabel: string = "";

  constructor(private router: Router, private coookieService: CookieService, private authService: AuthService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.token = this.coookieService.get('jwtToken');
    this.getAllProducts();
    this.loadIDProofTypes();
    this.initObjects();
  }

  initObjects() {
    this.owner = new Profile();
    this.rental = new Rental();
    this.rental.id_proof = "0";
  }

  getAllProducts() {
    this.productsData = null;
    this.productsData = new Array<Product>();
    if (this.token != null && this.token != "" && this.token != "undefined") {
      this.dataService.getAllProducts(this.token).subscribe(res => {
        if (res.status == 200) {
          this.productsData = res.json();
        }
      });
    }
    else {
      this.dataService.getRegisteredProducts().subscribe(res => {
        if (res.status == 200) {
          this.productsData = res.json();
        }
      });
    }
  }

  loadProductImages(product_id) {
    let imgCount = this.imagesUrl.length;
    for(let i=imgCount; i>=0; i--) {
      this.imagesUrl.splice(i, 1);
    }
    this.dataService.getProductImages(this.token, product_id).subscribe(res => {
      if (res.status == 200) {
        this.hasProductImages = true; 
        let images = res.json();
        images.forEach(element => {
          this.imagesUrl.push(element['path']);
        });
      }
      else {
        this.hasProductImages = false;
      }
    });
  }

  searchTextChanged(inputData: any) {
    let searchData = JSON.parse(inputData);
    if (searchData["search_place"] === "" && searchData["search_product"] === "") {
      this.getAllProducts();
    }
  }

  search(inputData: any) {
    let searchData = JSON.parse(inputData);
    this.productsData = null;
    this.productsData = new Array<Product>();
    this.dataService.search(this.token, searchData).subscribe(res => {
      if (res.status == 200) {
        this.productsData = res.json();
      }
    });
  }

  loadIDProofTypes(){
    $("#id_proof option").remove();
    this.dataService.getIDProofTypes(this.token).subscribe((resp) => {
      if(resp.status == 200) { 
        let data = resp.json();
        $("#id_proof").append($("<option></option>").val("0").html("Select ID Proof"));
        for (var i = 0; i < data.length; i++) {
          $("#id_proof").append($("<option></option>").val(data[i].key).html(data[i].value));
          $("#id_proof")[0].selectedIndex = 0;
        }
      }
    });
  }

  showRentalRequestModal(product_id, price_per_day) {
    this.infoLabel = "";
    if (this.token != null && this.token != "" && this.token != "undefined") {
      this.rental = null;
      this.rental = new Rental();
      this.rental.id_proof = "0";
      this.rental.from_date = new Date();
      this.rentingProductId = product_id;
      this.rentingProductPrice = price_per_day;
      this.isUpcomingOngoingRentalRequestExists = false;
      this.dataService.checkRentalRequestStatus(this.token, product_id).subscribe((resp) => {
        if(resp.status == 204) {
          $('#btnShowRentalRequestModal').click();
        }
        else if (resp.status == 200){
          console.log("Upcoming or Ongoing rental request exists");
          this.isUpcomingOngoingRentalRequestExists = true;
          this.existingRentalRequestValidationMessage = resp.json()["message"];
          $('#btnShowRentalRequestModal').click();
        }
        else {
          $('#showErrorModal').click();
        }
      });
    }
    else {
      this.infoLabel = "Please login to send a rental request!";
      $('#btnInfoModal').click();
    }
  }

  showTotalPrice() {
    const daysBetweenDates: number = this.getRentalDays();
    let totalAmount: number = this.rentingProductPrice * daysBetweenDates;
    this.rental.mode_of_payment = "Total Rs. " + totalAmount + " by CASH/PAYTM";
  }

  getRentalDays() {
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = this.rental.from_date.getTime();
    const end: number = this.rental.to_date.getTime();
    const daysBetweenDates: number = Math.ceil((end - start) / MS_PER_DAY);
    return daysBetweenDates;
  }

  requestRental(){
    // Validation
    this.isToDateFromPast = false;
    this.isIDProofSelected = true;
    const daysBetweenDates: number = this.getRentalDays();
    if (daysBetweenDates < 0) {
      this.isToDateFromPast = true;
      return;
    }
    else if (this.rental.id_proof == '0') {
      this.isIDProofSelected = false;
      return;
    }

    this.rental.product_id = this.rentingProductId;
    this.dataService.requestRental(this.token, this.rental).subscribe(res => {
      if (res.status == 201) {
        $('#btnDiscardRentalRequest').click();
        this.getAllProducts();
        this.initObjects();
        $('#showSuccessModal').click();
      }
      else {
        $('#showErrorModal').click();
      }
    });
  }

  showProductOwnerInfo(owner_id, product_id) {
    this.infoLabel = "";
    if (this.token != null && this.token != "" && this.token != "undefined") {
      this.isUpcomingOngoingRentalRequestExists = false;
      this.dataService.checkRentalRequestStatus(this.token, product_id).subscribe((resp) => {
        if(resp.status == 204) {
          $('#btnShowOwnerInfoModal').click();
        }
        else if (resp.status == 200){
          this.isUpcomingOngoingRentalRequestExists = true;
          this.authService.getUserInfo(this.token, owner_id).subscribe(res => {
            if (res.status == 200) {
              $('#btnShowOwnerInfoModal').click();
              this.owner = null;
              this.owner = new Profile();
              this.owner = res.json();
            }
          });
        }
        else {
          $('#showErrorModal').click();
        }
      });
    }
    else {
      this.infoLabel = "Please login to check Owner's full contact info!";
      $('#btnInfoModal').click();
    }
  }

}
