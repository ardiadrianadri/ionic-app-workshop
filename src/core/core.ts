import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApi } from './user-service';
@NgModule({
  imports: [ CommonModule ],
  providers: [ UserApi ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('The core module can be injected only once');
    }
  }
}