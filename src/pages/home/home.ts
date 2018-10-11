import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { SigninPage } from '../signin/signin';
import { UserApi } from '../../core';
import { UserData, Response } from '../../common';
import { NavMenuPage } from '../nav-menu/nav-menu';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username = '';
  public password = '';
  
  public errors: String[] = null;

  constructor(
    public navCtrl: NavController,
    private _userService: UserApi
  ) {}

  ionViewWillEnter() {
    this._userService.isSessionActive().then(
      (isActive: boolean) => {
        if (isActive) {
          this.navCtrl.push(NavMenuPage);
        }
      }
    );
  }

  public navigateSignIn() {
    this.navCtrl.push(SigninPage);
  }

  public navigateLogin() {
    this.errors = null;

    this._userService.searchUser(this.username).pipe(
      concatMap((user: UserData) => {
        let result: Observable<Response> = null;

        if (user && (user.password === this.password)) {
          result = this._userService.startSession(user);
        } else {
          result = Observable.throw({
            success: false,
            message: 'Incorrect username or password'
          });
        }

        return result;
      })
    ).subscribe(
      () => { this.navCtrl.push(NavMenuPage); },
      (error: Response) => { this.errors = [error.message]; }
    );
  }

  public TryPass() {
    this.navCtrl.push(NavMenuPage)
    .then(
      (value: boolean) => {
        if (!value) {
          this.errors = ['You need to login in the app to pass'];
        }
      }
    );
  }
}
