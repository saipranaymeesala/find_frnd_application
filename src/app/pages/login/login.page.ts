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
  // private OTP: any;
  public isVisibleEmailInput: boolean = true;
  public resend: boolean = true;
  public timer: number = 59;
  public isdisableResend: boolean = true;

  public otpsent: boolean = true;
  public userOTP: string = '';
  public otpValidation: boolean = false;
  public interval: any;

  constructor(private router: Router, private service: LoginService, private loadingCtrl: LoadingController) { }

  errors = [
    { type: 'required', message: 'Field cannot be empty' },
    { type: 'email', message: 'Please enter valid email' },
    { type: 'emailValidation', message: 'Invalid email' }
  ]

  login = new FormGroup({
    email: new FormControl('', [Validators.required, this.emailValidation]),
    otp: new FormControl('', [Validators.required])
  })

  public emailValidation(event: any): any {
    const userEmail = event.value;
    const emailPattern: any = /^[A-Za-z0-9._@#$%&*+-]+@gmail\.com$/;
    const test = emailPattern.test(userEmail);
    if (test) {
      return null;
    }
    else {
      return { 'emailpattern': true };
    }
  }

  public async sendOTP() {

    const emailValid: boolean = this.login.controls.email.valid;
    if (emailValid) {
      const email: any = this.login.controls.email.value;

      this.loadingCtrl.create({
        keyboardClose: true,
        message: 'Sending Otp...'
      }).then((sending) => sending.present());
      setTimeout(() => {

        this.service.sendOTP(email).subscribe(async (response: HttpResponse<any>) => {
          this.loadingCtrl.dismiss();
          const status: number = response.status;
          const OTP = response.body.code;

          const cache = await caches.open('my-cache');
          await cache.put(`http://localhost:9090/api/sendOtp?email=${email}`, new Response(JSON.stringify({ OTP }),
            { headers: { 'Content-Type': 'application/json' } }));

          console.log("send otp code", OTP) // console
          if (status === 200) {
            this.isVisibleEmailInput = false;
            this.otpsent = false;
            this.resend = false;
            this.timer = 59;
            this.isdisableResend = true;

            this.interval = setInterval(() => {
              if ((--this.timer) === 0) {
                this.resend = true;
                this.isdisableResend = false;
                clearInterval(this.interval);
              }
            }, 1000)
          }
          localStorage.setItem('userEmail', email)
        },
          err => { }
        );
      }, 3300)
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
            this.timer = 2;
            this.isVisibleEmailInput = true;
            this.otpValidation = false;
            this.otpsent = true;
            this.login.reset();
            this.loadingCtrl.dismiss();
            this.router.navigate(['/userdetails']);
          }, 1500)
        }
      },
        err => {
          this.otpValidation = true;
        }
      );
    }
    else {
      console.log("invalid otp");
    }
  }
  public nextPage() {
    this.router.navigate(['/userdetails']);
  }
  ngOnInit() {
  }

}
