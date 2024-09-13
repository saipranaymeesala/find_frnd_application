import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilecompletionPageRoutingModule } from './profilecompletion-routing.module';

import { ProfilecompletionPage } from './profilecompletion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilecompletionPageRoutingModule
  ],
  declarations: [ProfilecompletionPage]
})
export class ProfilecompletionPageModule {}
