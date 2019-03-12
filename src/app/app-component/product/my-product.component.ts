import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataServiceService } from '../../app-service/data-service.service';
import { Product } from '../../app-model/product';
import { Profile } from '../../app-model/profile';
import { Rental } from 'src/app/app-model/rental';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

declare var $: any;

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.css']
})
export class MyProductComponent implements OnInit {

  @Input() profile: Profile;
  @ViewChild("productImage1") fileInput1: any;
  @ViewChild("productImage2") fileInput2: any;
  @ViewChild("productImage3") fileInput3: any;
  token: any;
  tokenStr: string;
  productOwner: Profile;
  newProduct: Product;
  productIdForImageUpload: number = 0;
  delProductId: number = 0;
  validationMsg: string;
  imgMaxSize: number = 2048;
  imgValidationMsg: string;
  isImageUploadSuccessfull: boolean;
  hasProductImages: boolean;
  imagesUploadCount: number = 0;
  productImagesCount: number = 0;
  canUploadImages: number = 0;

  productsData: Array<Product> = [];
  incomingRentalsData: Array<Rental> = [];
  outgoingRentalsData: Array<Rental> = [];
  imagesUrl: Array<any> = [];

  constructor(private router: Router, private coookieService: CookieService, private dataService: DataServiceService) { }

  ngOnInit() {
    this.token = this.coookieService.get('jwtToken');
    this.productOwner = new Profile();
    this.initProduct();
    this.getProducts();
    this.getIncomingRentals();
    this.getOutgoingRentals();
    this.loadProductTypes();
  }

  ngAfterViewInit() {
    //this.hideGridOnLoad();
  }

  hideGridOnLoad() {
    $('#divIncomingRentalsList').hide();
    $('#divOutgoingRentalsList').hide();
  }

  initProduct() {
    this.newProduct = null;
    this.newProduct = new Product();
    this.newProduct.type = "0";
  }

  getProducts() {
    this.productsData = null;
    this.productsData = new Array<Product>();
    this.dataService.getUserProducts(this.token).subscribe(res => {
      if (res.status == 200) {
        this.productsData = res.json();
      }
    });
  }

  getIncomingRentals() {
    this.incomingRentalsData = null;
    this.incomingRentalsData = new Array<Rental>();
    this.dataService.getIncomingRentalRequests(this.token).subscribe(res => {
      if (res.status == 200) {
        this.incomingRentalsData = res.json();
      }
    });
  }

  getOutgoingRentals() {
    this.outgoingRentalsData = null;
    this.outgoingRentalsData = new Array<Rental>();
    this.dataService.getOutgoingRentalRequests(this.token).subscribe(res => {
      if (res.status == 200) {
        this.outgoingRentalsData = res.json();
      }
    });
  }

  loadProductTypes(){
    $("#type option").remove();
    this.dataService.getProductTypes(this.token).subscribe((resp) => {
      if(resp.status == 200) { 
        let data = resp.json();
        $("#type").append($("<option></option>").val("0").html("Select Product Type"));
        for (var i = 0; i < data.length; i++) {
          $("#type").append($("<option></option>").val(data[i].key).html(data[i].name));
          $("#type")[0].selectedIndex = 0;
        }
      }
    });
  }

  addUpdateProduct() {
    // html tags input validating in textarea
    const regTags = /<(.|\n)*?>/g;
    if (regTags.test(this.newProduct.name.toString())) {
      $('#showValidationModal').click();
      this.validationMsg = "HTML tags are not allowed in product's name."
      return;
    }
    if (regTags.test(this.newProduct.desc.toString())) {
      $('#showValidationModal').click();
      this.validationMsg = "HTML tags are not allowed in product's description."
      return;
    }

    if(this.newProduct.product_id == null) {
      this.dataService.addProduct(this.token, this.newProduct).subscribe(res => {
        if (res.status == 201) {
          console.log("Product added");
          $('#btnCloseAddUpdateProductModal').click();
          // Show success modal
          $('#showSuccessModal').click();
          this.getProducts();
        }
        else {
          $('#btnCloseAddUpdateProductModal').click();
          // Show failure modal
          $('#showFailureModal').click();
        }
      });
    }
    else {
      this.dataService.updateProduct(this.token, this.newProduct).subscribe(res => {
        if (res.status == 204) {
          console.log("Product updated");
          $('#btnCloseAddUpdateProductModal').click();
          // Show success modal
          $('#showSuccessModal').click();
          this.getProducts();
        }
        else {
          $('#btnCloseAddUpdateProductModal').click();
          // Show failure modal
          $('#showFailureModal').click();
        }
      });
    }
  }

  setProductIdForImageUpload(productIdForImage: any) {
    this.productIdForImageUpload = productIdForImage;
    this.isImageUploadSuccessfull = null;
    this.dataService.getProductImagesCount(this.token, productIdForImage).subscribe(res => {
      if (res.status == 200) {
        this.productImagesCount = res.json()['count'];
        this.canUploadImages= 3 - this.productImagesCount;
      }
    });
  }

  uploadImages() {
    let imageTypes: Array<any> = ["image/png", "image/jpeg"]

    let nativeElement1: HTMLInputElement;
    if(this.fileInput1 != undefined) {
      nativeElement1 = this.fileInput1.nativeElement;
    }
    let nativeElement2: HTMLInputElement;
    if(this.fileInput2 != undefined) {
      nativeElement2 = this.fileInput2.nativeElement;
    }
    let nativeElement3: HTMLInputElement;
    if(this.fileInput3 != undefined) {
      nativeElement3 = this.fileInput3.nativeElement;
    }

    // Validations -- STARTS
    this.imgValidationMsg = null;
    if(this.productImagesCount == 3) {
      this.imgValidationMsg = "Already exceeded the number of images allowed. Please delete existing and try.";
      return;
    }
    if(nativeElement1 != undefined && nativeElement1.files.length > 0) {
      if (imageTypes.indexOf(nativeElement1.files[0].type) == -1 ) {
        this.imgValidationMsg = nativeElement1.files[0]['name'] + " file format is not supported.";
        return;
      }
      if ((nativeElement1.files[0].size / 1024) >= this.imgMaxSize) {
        this.imgValidationMsg = nativeElement1.files[0]['name'] + " image file excedeed 2MB size.";
        return;
      }
    }
    if(nativeElement2 != undefined && nativeElement2.files.length > 0) {
      if (imageTypes.indexOf(nativeElement2.files[0].type) == -1 ) {
        this.imgValidationMsg = nativeElement2.files[0]['name'] + " file format is not supported.";
        return;
      }
      if ((nativeElement2.files[0].size / 1024) >= this.imgMaxSize) {
        this.imgValidationMsg = nativeElement2.files[0]['name'] + " image file excedeed 2MB size.";
        return;
      }
    }
    if(nativeElement3 != undefined && nativeElement3.files.length > 0) {
      if (imageTypes.indexOf(nativeElement3.files[0].type) == -1 ) {
        this.imgValidationMsg = nativeElement3.files[0]['name'] + " file format is not supported.";
        return;
      }
      if ((nativeElement3.files[0].size / 1024) >= this.imgMaxSize) {
        this.imgValidationMsg = nativeElement3.files[0]['name'] + " image file excedeed 2MB size.";
        return;
      }
    }
    // Validations -- ENDS

    let uploadImageData = new FormData();
    uploadImageData.append("product_id", this.productIdForImageUpload.toString());
    if (nativeElement1 != undefined && nativeElement1.files.length > 0) {
      uploadImageData.append("image_1", nativeElement1.files[0]);
    }
    if ( nativeElement2 != undefined && nativeElement2.files.length > 0) {
      uploadImageData.append("image_2", nativeElement2.files[0]);
    }
    if (nativeElement3 != undefined && nativeElement3.files.length > 0) {
      uploadImageData.append("image_3", nativeElement3.files[0]);
    }

    this.dataService.uploadProductImage(this.token, uploadImageData).subscribe(res => {
      if (res.status == 200) {
        this.setProductIdForImageUpload(this.productIdForImageUpload);
        this.isImageUploadSuccessfull = true;
        this.imagesUploadCount = res.json()["images_count"];
      }
      else {
        this.isImageUploadSuccessfull = false;
      }
    });
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

  editProduct(product_id){
    this.dataService.getProductInfo(this.token, product_id).subscribe(res => {
      if (res.status == 200) {
        this.newProduct = null;
        this.newProduct = new Product();
        this.newProduct = res.json();
        // Open modal popup
        $('#addProduct').click();
      }
    });
  }

  deleteProductConfirmation(productId) {
    this.delProductId = productId;
    $('#btnDeleteConfirmModal').click();
  }

  deleteProduct(product_id) {
    $('#btnDeleteDiscard').click();
    this.dataService.deleteProduct(this.token, product_id).subscribe(res => {
      if (res.status == 204) {
        this.getProducts();
        // Show success modal
        $('#successModal').click();
      }
      else {
        // Show failure modal
        $('#failureModal').click();
      }
    });
  }

  approveRentalRequest(element, text, rental_id, item_status) {
    this.dataService.approveRentalRequest(this.token, rental_id).subscribe(res => {
      if (res.status == 204) {
        console.log("Product rental approved");
        // Disable button and update text
        element.textContent = text;
        element.disabled = true;
        // Get rental info
        this.getRentalInfo(rental_id, item_status);
      }
      else {
        // Show failure modal
        $('#showFailureModal').click();
      }
    });
  }

  denyRentalRequest(element, text, rental_id, item_status) {
    this.dataService.denyRentalRequest(this.token, rental_id).subscribe(res => {
      if (res.status == 204) {
        console.log("Product rental denied");
        // Disable button and update text
        element.textContent = text;
        element.disabled = true;
        // Get rental info
        this.getRentalInfo(rental_id, item_status);
      }
      else {
        // Show failure modal
        $('#showFailureModal').click();
      }
    });
  }

  getRentalInfo(rental_id, item_status) {
    this.dataService.getRentalInfo(this.token, rental_id).subscribe(res => {
      if (res.status == 200) {
        console.log("Product rental info");
        item_status.innerText = "";
        item_status.innerText = res.json()["status"];
      }
    });
  }

  showProductOwnerInfo(product_id) {
    this.dataService.getUserInfoOnProductId(this.token, product_id).subscribe(res => {
      if (res.status == 200) {
        $('#btnShowOwnerInfoModal').click();
        this.productOwner = null;
        this.productOwner = new Profile();
        this.productOwner = res.json();
      }
    });
  }

}
