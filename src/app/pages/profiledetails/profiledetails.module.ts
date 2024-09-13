import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfiledetailsPageRoutingModule } from './profiledetails-routing.module';

import { ProfiledetailsPage } from './profiledetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfiledetailsPageRoutingModule
  ],
  declarations: [ProfiledetailsPage]
})
export class ProfiledetailsPageModule {}
