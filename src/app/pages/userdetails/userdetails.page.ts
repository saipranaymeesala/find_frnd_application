import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/apis/profile.service';
import { UserprofilesService } from 'src/app/apis/userprofiles.service';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {
  constructor(private router: Router, private service: ProfileService) { }



  public gender: any;
  public dateofbirth: any;
  public storeDateValue: any;


  userDetails = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateofbirth: new FormControl('', [Validators.required])
  })

  public showGender(event: any) {
    this.gender = event.detail.value;
  }

  public showDate(event: any) {
    this.storeDateValue = event.detail.value;
    this.dateofbirth = this.storeDateValue.slice(0, 10);
  }
  public email:any =JSON.parse(JSON.stringify(localStorage.getItem('userEmail')));

  public submit() {

    let userDataObj = {
      email: this.email,
      gender: this.userDetails.get('gender')!.value,
      name: this.userDetails.get('nickname')!.value,
      dob: this.userDetails.get('dateofbirth')!.value
    }
    localStorage.setItem('userData', JSON.stringify(userDataObj)),
      this.router.navigate(['/avatars'])

    this.service.sendProfileDetails(userDataObj).subscribe((data) => {

      console.log(data)
    })

  }


  ngOnInit() {
  }
}