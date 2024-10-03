import { Component } from '@angular/core';
import { PrivacyScreen } from '@capacitor-community/privacy-screen';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private storage: Storage, private navCtrl: NavController,private platform: Platform) {
    this.enablePrivacyScreen();
   this.initializeApp();
  }
  async initStorage() {
    await this.storage.create();
  }
  async initializeApp() {
    try {
      await this.storage.create(); // Initialize storage
      this.checkLoginStatus();     // Now check login status
    } catch (err) {
      console.error('Storage initialization error:', err);
    }
    await this.platform.ready();
  }
  async checkLoginStatus() {
    console.log('Checking login status...'); // Debugging
  
    const isLoggedIn = await this.storage.get('isLoggedIn');
    
    console.log('Is Logged In:', isLoggedIn); // See if you are getting a value
  
    if (isLoggedIn) {
      console.log('User is logged in, navigating to home...');
      this.navCtrl.navigateRoot('/home');
    } else {
      console.log('User is not logged in, navigating to login...');
      this.navCtrl.navigateRoot('/login');
    }
  }

  async enablePrivacyScreen() {
    try {
      await PrivacyScreen.enable();
      console.log('Privacy screen enabled successfully.');
    } catch (error) {
      console.error('Failed to enable privacy screen:', error);
    }
  }
}
