import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserdetailsPageRoutingModule } from './userdetails-routing.module';

import { UserdetailsPage } from './userdetails.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UserdetailsPageRoutingModule
  ],
  declarations: [UserdetailsPage]
})
export class UserdetailsPageModule {}
