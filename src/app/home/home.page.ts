import { Component, OnInit } from '@angular/core';
import { LoginService } from '../apis/login.service';
import { RequsetService } from '../apis/requset-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userData: any;
  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
    console.log(this.userData);


  }
}