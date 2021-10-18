import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { concat, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sensitive-data',
  templateUrl: './sensitive-data.component.html',
  styleUrls: ['./sensitive-data.component.css']
})
export class SensitiveDataComponent implements OnInit {
  public sensitiveData: string

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { 
        http.get(baseUrl + 'auth/token', { responseType: 'text' }).pipe(
          switchMap((token: string) => this.http.get(this.baseUrl + "sensitivedata", {
            headers: new HttpHeaders(
              { 'Authorization': 'Bearer ' + token },
            ).append('Content-Type', 'application/json'),
            responseType: 'text'
          })
        ))
    .subscribe(data => {
      this.sensitiveData = data
    })
  }

  ngOnInit() {
  }

}
