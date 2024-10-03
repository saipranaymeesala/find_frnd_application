import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ad-modal',
  templateUrl: './ad-modal.page.html',
  styleUrls: ['./ad-modal.page.scss'],
})
export class AdModalPage {

  constructor(private modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
