import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarsPageRoutingModule } from './avatars-routing.module';

import { AvatarsPage } from './avatars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarsPageRoutingModule
  ],
  declarations: [AvatarsPage]
})
export class AvatarsPageModule {}
