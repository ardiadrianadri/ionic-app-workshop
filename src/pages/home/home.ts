import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  public navigateSignIn() {
    this.navCtrl.push(SigninPage);
  }

  public navigateLogin() {
    this.errors = null;

    this._userService.searchUser(this.username).subscribe(
      (user: UserData) => {
        if (user && (user.password === this.password)) {
          this.navCtrl.push(NavMenuPage);
        } else {
          this.errors = ['Incorrect username or password'];
        }
      },
      (error: Response) => {
        this.errors = [error.message];
      }
    );
  }
}
