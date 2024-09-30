import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { ProfileService } from 'src/app/apis/profile.service';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.page.html',
  styleUrls: ['./profiledetails.page.scss'],
})
export class ProfiledetailsPage implements OnInit {
  ProfiledetailsPageselectedImage: string | undefined;

  ProfiledetailsPagesaveProfile() {
    throw new Error('Method not implemented.');
  }

  selectedImage: string | null = null
  public nickname: string = '';
  public email: string = '';
  public userData: any = '';
  public changeImage: boolean = true;
  profile={userid:'',nickname:'',email:''}

  constructor(
    private platform: Platform,
    private router: Router,
    private alert: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private prfileservice:ProfileService,
    private route:ActivatedRoute
  ) { }
  public getEmail:any =JSON.parse(JSON.stringify(localStorage.getItem('userEmail')));

  ngOnInit() {
    console.log('profiledetailspage initialized');

    // this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData')|| '{}')))
    let iddata: any;
    
    // this.route.paramMap.subscribe((data) => {
    //   iddata = data.get('id');
    //   console.log('Fetching profile for ID:', iddata);
    const getEmail:any =JSON.parse(JSON.stringify(localStorage.getItem('userEmail')));

      this.prfileservice.getProfileDetails(getEmail).subscribe(
        (response) => {
          this.profile.nickname=response.nickname;
          this.profile.email=response.email;
          this.profile.userid=response.profileid;
          localStorage.setItem("isActive","yes")
          // localStorage.removeItem('userEmail')
        },
        (error) => {
          console.error('Error fetching profile details:', error);
        })
    //   );
    // });
   
      
    }
 
  




  async selectImage() {
    try {
      if (this.platform.is('hybrid')) {
        const image = await Camera.getPhoto({
          source: CameraSource.Photos, 
          resultType: CameraResultType.DataUrl, 
        });
        this.ProfiledetailsPageselectedImage = image.dataUrl;
      } else {
        this.fileInputClick();
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  }

  fileInputClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.changeImage = false;
        this.selectedImage = e.target.result;


      };
      reader.readAsDataURL(file);

    };
    fileInput.click();
  }

  public Logout(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem("isActive")
    localStorage.removeItem('userEmail')

  }

  public DeleteAccount(): void {
    localStorage.removeItem("isActive")
    localStorage.removeItem('userEmail')


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
          this.loadingCtrl.create(
            {
              keyboardClose: true, message: ' Deleting ...'
            }).then((deleting) => deleting.present());
          setTimeout(() => {
            this.loadingCtrl.dismiss();
            this.alert.create({
              message: 'Your account deleted successfully',
            }).then((alert) => {
              alert.style.background = 'white',
                this.router.navigate(['/introduction']);
              alert.present()
            });
          }, 1500)

        }
      }],
    }).then((alert) => {
      alert.style.background = 'white',
        alert.present()
    });
  }

}
