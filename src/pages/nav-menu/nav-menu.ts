import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListCatsPage } from '../list-cats/list-cats';
import { UserApi } from '../../core';
import { Response } from '../../common';
@Component({
  selector: 'nav-menu',
  templateUrl: 'nav-menu.html'
})
export class NavMenuPage {

  public rootPage = ListCatsPage;
  
  constructor(
    private _userService: UserApi,
    private _navCtrl: NavController
  ) { }

  public logoutNavigation() {
    this._userService.closeSession().subscribe(
      () => { this._navCtrl.pop(); },
      (error: Response) => { throw new Error(error.message); }
    );
  }
}
