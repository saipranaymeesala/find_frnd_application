import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/apis/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public resend: boolean = true;
  public timer: number = 59;
  public isdisableResend: boolean = true;
  public otpsent: boolean = true;
  public userOTP: string = '';

  constructor(private router: Router, private service: LoginService, private loadingCtrl: LoadingController) { }

  errors = [
    { type: 'required', message: 'Field cannot be empty' },
    { type: 'email', message: 'Please enter valid email' },
    { type: 'minlength', message: 'Characters must be 4' },
    { type: 'maxlength', message: 'Characters must be 4' },
    { type: 'emailValidation', message: 'Invalid email' }
  ]

  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  })

  // public emailValidation(event: any): any {
  //   const userEmail = event.value;
  //   console.log(userEmail);
  //   const emailPattern: any = "^[A-Za-z0-9]+\\@+[a-z]{4}+\\.[a-z]{3}$";
  //   if (emailPattern.test(userEmail)) {
  //     return { 'emailpattern': true };
  //   }
  //   else {
  //     return { 'emailpattern': false };
  //   }
  //   return true;
  // }


  public sendOTP(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log("User data : " + userData);

    const storedOtp = localStorage.getItem('otp');
    console.log("User storedOtp : " + storedOtp);


    let userDataEmail = {
      email: this.login.get('email')!.value,
      otp: this.login.get('otp')!.value,
    }

    localStorage.setItem('userData', JSON.stringify(userDataEmail));

    const emailValid: boolean = this.login.controls.email.valid;
    if (emailValid) {
      const email = this.login.controls.email.value;
      this.service.sendOTP(email).subscribe((Response: HttpResponse<any>) => {
        const response: number = Response.status;
        if (response === 200) {
          this.otpsent = false;
          this.resend = false;
          this.timer = 59;
          this.isdisableResend = true;
          const interval = setInterval(() => {
            if ((--this.timer) === 0) {
              this.resend = true;
              this.isdisableResend = false;
              clearInterval(interval);
            }
          }, 1000)
        }
      },
        err => { }
      );
    }
    else {
      console.log("invalid email id");
    }
  }

  public verifyOTP(): any {

    // let userDataOTP = {
    //   email: this.login.get('email')!.value,
    //   otp: this.login.get('otp')!.value,
    // }
    // localStorage.setItem('userData', JSON.stringify(userDataOTP))

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log("userData in verify : " + userData);

    const otpValid: boolean = this.login.controls.otp.valid;
    if (otpValid) {
      const otp: any = this.login.controls.otp.value;
      console.log("user entered otp : " + otp); // user entered otp
      this.service.verifyOTP(otp).subscribe((Response: HttpResponse<any>) => {
        const response: number = Response.status;
        console.log("response from http : " + response); // response
        if (response === 200) {
          console.log("passed if condition of verifyOtp"); // passed if conditon;
          this.loadingCtrl.create(
            {
              keyboardClose: true, message: ' Verifying ...'
            }).then((verifying) => verifying.present());
          setTimeout(() => {
            this.loadingCtrl.dismiss();
            // this.router.navigate(['/userdetails']);
          }, 1500)
        }
      },
        err => { }
      );
    }
    else {
      console.log("invalid otp");
    }

  }

  // --------------------------------------------------------------

  // public generateOTP(): any {
  //   let OTP = "";
  //   try {
  //     let OTPArray = "1234567890";
  //     let number;
  //     for (var i = 0; i < 4; i++) {
  //       number = Math.floor(Math.random() * OTPArray.length)
  //       OTP = OTP + OTPArray[number];
  //     }
  //   }
  //   catch (err: any) {
  //     console.log(err.message)
  //     OTP = "1234";

  //   }
  //   return Number(OTP);
  // }
  // public sendOTP(): void {
  //   let userDat = {
  //     email: this.login.get('email')!.value,
  //     otp: this.login.get('otp')!.value,
  //   }
  //   localStorage.setItem('userData', JSON.stringify(userDat))

  //   const emailValid: boolean = this.login.controls.email.valid;
  //   if (emailValid) {
  //     const email = this.login.controls.email.value;
  //     this.service.sendOTP(email).subscribe((Response: HttpResponse<any>) => {
  //       const response: number = Response.status;
  //       if (response === 200) {
  //         this.otpsent = false;
  //         this.resend = false;
  //         this.timer = 59;
  //         this.isdisableResend = true;
  //         const interval = setInterval(() => {
  //           if ((--this.timer) === 0) {
  //             this.resend = true;
  //             this.isdisableResend = false;
  //             clearInterval(interval);
  //           }
  //         }, 1000)
  //       }
  //     },
  //       err => { }
  //     );
  //   }
  //   else {
  //     console.log("invalid email id");
  //   }
  // }
  // public verifyOTP(): void {
  // }

  // --------------------------------------------------------------



  ngOnInit() {
    // console.log(this.generateOTP())
  }

}
