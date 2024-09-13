import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilecompletion',
  templateUrl: './profilecompletion.page.html',
  styleUrls: ['./profilecompletion.page.scss'],
})
export class ProfilecompletionPage implements OnInit {

  userData: any;
  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userData'))))
    console.log(this.userData);
  }

}