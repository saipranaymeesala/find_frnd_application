import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsandservicesPageRoutingModule } from './termsandservices-routing.module';

import { TermsandservicesPage } from './termsandservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsandservicesPageRoutingModule
  ],
  declarations: [TermsandservicesPage]
})
export class TermsandservicesPageModule {}
