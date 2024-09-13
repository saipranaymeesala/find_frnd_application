import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
 
  constructor() { }
 
  errors = [
    { type: 'required', message: 'Field cannot be empty' },
    { type: 'email', message: 'Please enter valid email' },
    { type: 'minlength', message: 'Characters must be 4' },
    { type: 'maxlength', message: 'Characters must be 4' }
  ]
 
  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
  })
 
  public sendOTP(): void {
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
 
  public verifyOTP(): any {
 
  }
  ngOnInit() { }
 
}
