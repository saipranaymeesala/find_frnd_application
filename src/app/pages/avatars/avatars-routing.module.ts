import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarsPage } from './avatars.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarsPageRoutingModule {}
