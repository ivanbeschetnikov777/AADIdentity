import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sensitiveData: string;
  name: string;
  token: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {  }

  getSensitiveData() {
    this.http
      .get(this.baseUrl + "sensitivedata", {
        headers: new HttpHeaders(
          { 'Authorization': 'Bearer ' + this.token },
        ).append('Content-Type', 'application/json'),
        responseType: 'text'
      })
      .subscribe(result => {
          if (result === undefined) {
            console.log('NOT AUTHORIZED');
          } else {
            this.sensitiveData = result;
            console.log(result);
          }
      });
  }

  getName() {
    this.http
      .get(this.baseUrl + "auth/name", { responseType: 'text' })
      .subscribe(result => {
          if (result === undefined) {
            console.log('NOT AUTHORIZED');
          } else {
            this.name = result;
            console.log(result);
          }
      });
  }

  login() {
    window.location.href = this.baseUrl + 'MicrosoftIdentity/Account/SignIn';
  }


  getToken() {
    this.http
      .get(this.baseUrl + "auth/token", { responseType: 'text' })
      .subscribe(result => {
          if (result === undefined) {
            console.log('NOT AUTHORIZED');
          } else {
            this.token = result;
            console.log(result);
          }
      });
  }
}
