import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallhistoryPageRoutingModule } from './callhistory-routing.module';

import { CallhistoryPage } from './callhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallhistoryPageRoutingModule
  ],
  declarations: [CallhistoryPage]
})
export class CallhistoryPageModule {}
