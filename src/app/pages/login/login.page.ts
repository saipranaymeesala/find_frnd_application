import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/apis/login.service';

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

  public emailValidation(event: any): any {
    // const userEmail = event.value;
    // console.log(userEmail);
    // const emailPattern: any = "^[A-Za-z0-9]+\\@+[a-z]{4}+\\.[a-z]{3}$";
    // if (emailPattern.test(userEmail)) {
    //   return { 'emailpattern': true };
    // }
    // else {
    //   return { 'emailpattern': false };
    // }
    return true;
  }


  public sendOTP(): void {
    const emailValid: boolean = this.login.controls.email.valid;
    if (emailValid) {
      const email = this.login.controls.email.value;
      this.service.sendOTP(email).subscribe((Response: HttpResponse<any>) => {
        const response: number = Response.status;
        if (response === 200) {
          this.otpsent = !this.otpsent;
          this.resend = !this.resend;
          this.timer = 59;
          this.isdisableResend = !this.isdisableResend;
          const interval = setInterval(() => {
            if ((--this.timer) === 0) {
              this.resend = !this.resend;
              this.isdisableResend = !this.isdisableResend;
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
    const otpValid: boolean = this.login.controls.otp.valid;
    if (otpValid) {
      const otp: any = this.login.controls.otp.value;
      this.service.verifyOTP(otp).subscribe((Response: HttpResponse<any>) => {
        const response: number = Response.status;
        if (response === 200) {
          this.loadingCtrl.create(
            {
              keyboardClose: true, message: ' Verifying ...'
            }).then((verifying) => verifying.present());
          setTimeout(() => {
            this.loadingCtrl.dismiss();
            this.router.navigate(['/userdetails']);
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
  ngOnInit() { }

}
