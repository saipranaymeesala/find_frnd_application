import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {

  userDetails = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
  });
  public isShowDate: boolean = false;
  public viewCalendar: number = 0;
  constructor(private router: Router) { }

  public dateVisibility(): void {
    this.viewCalendar++;

    if (this.viewCalendar === 1) {
      this.isShowDate = true;
    } else {
      this.isShowDate = false;
      this.viewCalendar = 0;
    }
  }

  public dateOfBirth: any = '';
  public changeOnDate(event: any): any {
    const storevalue = event.detail.value;
    this.dateOfBirth = storevalue.slice(0, 10);
  }



  submitDetails(e: any) {
    let userDataObj = {
      name: this.userDetails.get('name')!.value,
      gender: this.userDetails.get('gender')!.value,
      dob: this.userDetails.get('dateOfBirth')!.value
    }
    localStorage.setItem('userData', JSON.stringify(userDataObj))
    this.router.navigate(['/avatars'])

  }

  ngOnInit() { }
}