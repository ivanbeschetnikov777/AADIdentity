import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    http.get<string>(baseUrl + 'weatherforecast/token').subscribe((token: string) => {
            if (token === undefined) {
              console.log('token not received!');
            } else {
              console.log(token);
            }
          });

    // http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
    //   this.forecasts = result;
    // });

      //   this.forecasts = result;
      // }, error => {
    // http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
    //   this.forecasts = result;
    // }, error => {
    //   http.get<string>(baseUrl + 'weatherforecast/token').subscribe((token: string) => {
    //       if (token === undefined) {
    //         console.log('token not received!');
    //       } else {
    //         http.get<WeatherForecast[]>(baseUrl + 'weatherforecast', {
    //           headers: new HttpHeaders ({
    //             'Bearer': token,
    //             'Content-Type': 'application/json'
    //           })
    //         }).subscribe(res2 => {
    //           this.forecasts = res2;
    //         })
    //       }
    //   })
    // });
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
