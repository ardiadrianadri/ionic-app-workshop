import { Component } from '@angular/core';

import { ListCatsPage } from '../list-cats/list-cats';
@Component({
  selector: 'nav-menu',
  templateUrl: 'nav-menu.html'
})
export class NavMenuPage {

  public rootPage = ListCatsPage;
  constructor() { }
}
