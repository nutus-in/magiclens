import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private headers = null;
  private options = null;

  constructor(private http: Http) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  reportBug(token, bugData) {
    let tokenStr = token.split('\'');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + tokenStr[1] })
    let options = new RequestOptions({ headers: headers });
    return this.http.post(apiUrl + "ReportBug", bugData, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }
}
