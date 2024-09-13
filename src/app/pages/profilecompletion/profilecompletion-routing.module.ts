import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilecompletionPage } from './profilecompletion.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilecompletionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilecompletionPageRoutingModule {}
