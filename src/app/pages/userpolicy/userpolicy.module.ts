import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserpolicyPageRoutingModule } from './userpolicy-routing.module';

import { UserpolicyPage } from './userpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserpolicyPageRoutingModule
  ],
  declarations: [UserpolicyPage]
})
export class UserpolicyPageModule {}
