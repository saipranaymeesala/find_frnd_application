import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

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

constructor(private platform: Platform) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

// Save the profile details (nickname, email, profile picture)
saveProfile() {
  console.log('Nickname:', this.nickname);
  console.log('Email:', this.email);
  console.log('Selected Image:', this.selectedImage);
  // Add your save logic here (e.g., call an API or update local storage)
}


}
