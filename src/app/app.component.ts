import { Component } from '@angular/core';
import { PrivacyScreen } from '@capacitor-community/privacy-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.enablePrivacyScreen();
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
