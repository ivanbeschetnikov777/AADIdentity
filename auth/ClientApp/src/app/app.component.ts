import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { filter } from 'rxjs/operators'
import { typeSourceSpan } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(NavMenuComponent, null)
  private navMenu!: NavMenuComponent;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
      http.get(baseUrl + 'auth/name', { responseType: 'text' })
        .pipe(
          filter((userName: string) => {
            if (userName == null)
              return true;
            else {
              this.navMenu.title = userName;
              return false;
            }
          })
        )
        .subscribe(result => {
          window.location.href = this.baseUrl + 'MicrosoftIdentity/Account/SignIn';
        });
     }

  ngOnInit() {}
}
