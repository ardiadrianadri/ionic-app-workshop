import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListCatsPage } from '../list-cats/list-cats';
import { UserApi } from '../../core';
import { Response, UserData } from '../../common';
@Component({
  selector: 'nav-menu',
  templateUrl: 'nav-menu.html'
})
export class NavMenuPage {

  public rootPage = ListCatsPage;
  public user: UserData = null;
  
  constructor(
    private _userService: UserApi,
    private _navCtrl: NavController
  ) { }

  ionViewCanEnter() {
    return this._userService.isSessionActive();
  }
  ionViewWillEnter() {
    this._userService.getSession().subscribe(
      (user: UserData) => { this.user = user; },
      (error: Response) => { throw new Error(error.message); } 
    );
  }

  public logoutNavigation() {
    this._userService.closeSession().subscribe(
      () => { this._navCtrl.pop(); },
      (error: Response) => { throw new Error(error.message); }
    );
  }
}
