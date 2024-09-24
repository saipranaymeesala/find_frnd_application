import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../apis/login.service';
import { RequsetService } from '../../apis/requset-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public notificationCount: number = 15;
  userData: any;
  constructor(private router: Router) { }

  public notification(): void {
    this.notificationCount++;
  }

  public profileDetails() {
    this.router.navigate(['/profiledetails']);
  }


  ngOnInit() {
    this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
    console.log(this.userData);
  }
}