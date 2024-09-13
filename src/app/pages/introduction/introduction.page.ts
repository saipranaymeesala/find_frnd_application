import { Component, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: Element | undefined;
  public swiper?: Swiper;
  public isChecked = false;
  // public isHidden: boolean = false;
  public images: any = [
    {
      title: "Title 1",
      imagepath: "/assets/intro/intro-1.webp",
      buttonTitle: "Let's Go",
      isDisable: true
    },
    {
      title: "Title 2",
      imagepath: "/assets/intro/intro-2.webp",
      buttonTitle: "Let's Go",
      isDisable: true
    },
    {
      title: "Title 3",
      imagepath: "/assets/intro/intro-3.webp",
      buttonTitle: "Let's Go",
      isDisable: true
    },
    {
      title: "Title 4",
      imagepath: "/assets/intro/intro-4.webp",
      buttonTitle: "Continue",
      isDisable: false
    }
  ]

  constructor() { }

  swiperSlideChanged(e: any) {
    console.log("changed:", e)
  }

  disable(event: any) {
    console.log(event)

  }
  moveloginPage() {
    localStorage.setItem('isWelcomeScreen', "false")
  }
  ngOnInit() { }

}

