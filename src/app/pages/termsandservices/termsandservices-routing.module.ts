import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsandservicesPage } from './termsandservices.page';

const routes: Routes = [
  {
    path: '',
    component: TermsandservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsandservicesPageRoutingModule {}
