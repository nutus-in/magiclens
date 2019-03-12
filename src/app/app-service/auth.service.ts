import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = null;
  private options = null;

  constructor(private http: Http, private cookieService: CookieService) { 
    this.headers = new Headers({ 
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  loadSite(){
    return this.http.get(apiUrl + "LoadSite", this.options).pipe(
      map((res: Response) => {
        return res;
    }));
  }

  sendOTP(phone){
    let phoneData = {"phone": phone}
    return this.http.post(apiUrl + "SendOTP", phoneData, this.options).pipe(
      map((res: Response) => {
        return res;
    }));
  }

  register(userData){
    return this.http.post(apiUrl + "Register", userData, this.options).pipe(
      map((res: Response) => {
        return res;
    }));
  }

  login(credentials){
    return this.http.post(apiUrl + "Login", credentials, this.options).pipe(
      map((res: Response) => {
        if(res != null && res.status == 200) {
          this.cookieService.set("currentUserId", res.json()["user_id"]);
          this.cookieService.set("currentUserName", res.json()["display_name"]);
          this.cookieService.set("jwtToken", res.json()["token"]);
        }
        return res;
    }));
  }

  logout() {
    //this.cookieService.deleteAll('../');
    this.cookieService.set("currentUserId", null);
    this.cookieService.set("currentUserName", null);
    this.cookieService.set("jwtToken", null);
    this.cookieService.delete("currentUserId", "/");
    this.cookieService.delete("currentUserName", "/");
    this.cookieService.delete("jwtToken", "/");
  }

  getUserInfo(token, user_id) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserInfo/" + user_id, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getUserSettings(token) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl + "GetUserSettings", options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateUserSettings(token, userSettingsData) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "UpdateUserSettings", userSettingsData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  activateDeactivateProfile(token){
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.put(apiUrl + "ActivateDeactivateProfile", null, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deleteUser(id){
    return this.http.delete(apiUrl + "DeleteUser?id=" + id, this.options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

}
