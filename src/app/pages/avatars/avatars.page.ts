import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.page.html',
  styleUrls: ['./avatars.page.scss'],
})
export class AvatarsPage implements OnInit {

  public gender: any = "";
  
  avatars_male: string[] = [
    '../assets/avatars/fotor-boy-01.webp',
    '../assets/avatars/fotor-boy-02.webp',
    '../assets/avatars/fotor-boy-03.webp',
    '../assets/avatars/fotor-boy-04.webp',
    '../assets/avatars/fotor-boy-05.webp',
    '../assets/avatars/fotor-boy-06.webp',
    '../assets/avatars/fotor-boy-07.webp',
    '../assets/avatars/fotor-boy-08.webp',
    '../assets/avatars/fotor-boy-09.webp',
    '../assets/avatars/fotor-boy-10.webp',
    '../assets/avatars/fotor-boy-11.webp',
    '../assets/avatars/fotor-boy-12.webp',
    '../assets/avatars/fotor-boy-13.webp',
    '../assets/avatars/fotor-boy-14.webp',
    '../assets/avatars/fotor-boy-15.webp',
  ];

  avatar_female: string[] = [
    '../assets/avatars/fotor-01.webp',
    '../assets/avatars/fotor-02.webp',
    '../assets/avatars/fotor-03.webp',
    '../assets/avatars/fotor-04.webp',
    '../assets/avatars/fotor-05.webp',
    '../assets/avatars/fotor-06.webp',
    '../assets/avatars/fotor-07.webp',
    '../assets/avatars/fotor-08.webp',
    '../assets/avatars/fotor-09.webp',
    '../assets/avatars/fotor-10.webp',
    '../assets/avatars/fotor-11.webp',
    '../assets/avatars/fotor-12.webp',
    '../assets/avatars/fotor-13.webp',
    '../assets/avatars/fotor-14.webp',
    '../assets/avatars/fotor-15.webp',
  ]

  selectedAvatarIndex: number | null = null;
  // router: any;
  constructor(private router: Router) {
  }


  selectAvatar(index: number) {
    this.selectedAvatarIndex = index;
  }

  confirmSelection() {
    if (this.selectedAvatarIndex !== null) {
      if(this.gender==='male')
      {
        const selectedAvatar = this.avatars_male[this.selectedAvatarIndex];
        let userData: any = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("userData"))))
        userData['avatar'] = selectedAvatar
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log('Selected Avatar:', userData);
        this.router.navigate(['/profilecompletion']);
      }
      else{
        const selectedAvatar = this.avatar_female[this.selectedAvatarIndex];
        let userData: any = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("userData"))))
        userData['avatar'] = selectedAvatar
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log('Selected Avatar:', userData);
        this.router.navigate(['/profilecompletion']);
      }

    } else {
console.log("no avatar selected");
       
    }
  }


  ngOnInit(): void {
    const rr: any = localStorage.getItem("userData")
    let user: any = JSON.parse(rr);
    console.log(user.gender)
    this.gender = user.gender
  }

}
