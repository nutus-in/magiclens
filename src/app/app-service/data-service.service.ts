import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private headers = null;
  private options = null;

  constructor(private http: Http) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  // PRODUCT SERVICE METHODS
  addProduct(token, productInfo) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "AddProduct", productInfo, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  uploadProductImage(token, formData) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "UploadImage", formData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getProductImages(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetProductImages/" + product_id, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getProductImagesCount(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetProductImagesCount/" + product_id, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }
  
  updateProduct(token, productInfo) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "UpdateProduct", productInfo, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getProductTypes(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetProductTypes", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getRegisteredProducts() {
    return this.http.get(apiUrl + "GetRegisteredProducts", this.options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getAllProducts(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetAllProducts", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getUserProducts(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserProducts", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getProductInfo(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetProductInfo/" + product_id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  deleteProduct(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(apiUrl + "DeleteProduct/" + product_id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getUserInfoOnProductId(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserInfoOnProductId/" + product_id, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  // RENTAL SERVICE METHODS
  getIDProofTypes(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetIDProofTypes", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  checkRentalRequestStatus(token, product_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "CheckRentalRequestStatus/" + product_id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  requestRental(token, rentalRequestData) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "RequestRental", rentalRequestData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getIncomingRentalRequests(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetIncomingRentalRequests", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getOutgoingRentalRequests(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserRentalRequests", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getRentalInfo(token, rental_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetRentalInfo/" + rental_id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  approveRentalRequest(token, rental_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "ApproveRentalRequest/" + rental_id, null, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  denyRentalRequest(token, rental_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "DenyRentalRequest/" + rental_id, null, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  // NOTIFICATIONS METHODS
  getNotificationCount(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserNotificationCount", options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getNotifications(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserNotifications", options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateNotifications(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "UpdateNotifications", null, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  // ANALYTICS
  getUserMetrics(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserMetrics", options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  // SEARCH ENGINE METHODS
  search(token, searchData) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "Search", searchData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }
}
