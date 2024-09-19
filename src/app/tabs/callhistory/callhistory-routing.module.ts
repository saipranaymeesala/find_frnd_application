import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallhistoryPage } from './callhistory.page';

const routes: Routes = [
  {
    path: '',
    component: CallhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallhistoryPageRoutingModule {}
