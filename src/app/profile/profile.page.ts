import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { AdModalPage } from '../pages/ad-modal/ad-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;
  
  constructor(private router: Router, private menu: MenuController, private modalCtrl: ModalController, private navCtrl: NavController) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.userData);
  }

  async goToAdd() {
    const modal = await this.modalCtrl.create({
      component: AdModalPage
    });
    return await modal.present();
  }

  goToSettings() {
    this.router.navigate(['../settings']);
  }
  goToAboutDosthi() {
    this.router.navigate(['/aboutDosthi']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  goToUserAgreement() {
    this.router.navigate(['/userAgreement']);
  }

  goToBlockedList() {
    this.router.navigate(['/blockedList']);
  }
  goToPrivacy() {
    this.router.navigate(['/privacy-policy']);
  }

  goToWallet() {
    this.router.navigate(['../wallet']);
  }

  goToCoin() {
    this.router.navigate(['/coin']);
  }

  toggleMenu() {
    this.menu.toggle('rightMenu');
    // this.router.navigate(['/menu'])
  }

  logout() {
    console.log('User logout Successfully')
    this.router.navigate(['/login'])
  }

  // FOR Delete Account
  // async confirmDelete() {
  //   try {
  //     const alert = await this.alertCtrl.create({
  //       header: 'Confirm',
  //       message: 'Are you sure you want to delete this item?',
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: () => {
  //             console.log('Delete canceled');
  //           }
  //         },
  //         {
  //           text: 'OK',
  //           handler: () => {
  //             console.log('Item deleted');
  //             this.router.navigate(['/introduction']);
  //           }
  //         }
  //       ]
  //     });

  //     await alert.present();
  //   } catch (error) {
  //     console.error('Error presenting alert:', error);
  //   }
  // }
}
