import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.page.html',
  styleUrls: ['./profiledetails.page.scss'],
})
export class ProfiledetailsPage {
  ProfiledetailsPageselectedImage: string | undefined;
  ProfiledetailsPagesaveProfile() {
    throw new Error('Method not implemented.');
  }
  selectedImage: string | null = null
  nickname: string = '';
  email: string = '';

  constructor(private platform: Platform, private router: Router, private alert: AlertController) { }
  ngOnInit() {
    console.log('profiledetailspage initialized');
  }

  // Method to handle image selection from the device
  async selectImage() {
    try {
      if (this.platform.is('hybrid')) {
        // For mobile devices, open the device's photo library
        const image = await Camera.getPhoto({
          source: CameraSource.Photos, // Opens photo library
          resultType: CameraResultType.DataUrl, // Return base64 image
        });
        this.ProfiledetailsPageselectedImage = image.dataUrl;
      } else {
        // For web/desktop, use the file input fallback
        this.fileInputClick();
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  }

  // Fallback for desktop browsers (file input for image selection)
  fileInputClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;

      };
      reader.readAsDataURL(file);

    };
    fileInput.click();
  }

  public Logout(): void {
    this.router.navigate(['/login']);
  }

  public DeleteAccount(): void {
    this.alert.create({
      header: 'Delete Account',
      message: 'Are you sure?, Account will be deleted permanently',
      buttons: [{
        text: 'cancel',
        role: 'cancel'
      },
      {
        text: 'delete',
        handler: () => {
          this.alert.create({
            message: 'Your account deleted successfully',
            buttons: [{
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/introduction']);
              }
            }],
            cssClass: 'alert',
          }).then((alert) => alert.present());
        }
      }],
      cssClass: 'alert'
    }).then((alert) => alert.present());
  }

}
