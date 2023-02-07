import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, AfterViewInit {

  @ViewChild('swiperRef', { static: true }) swiper?: SwiperComponent;

  currentSlideIndex = 0;

  constructor() {}

  get isLastSlide(){
    return this.currentSlideIndex === 2;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){

  }

  skip(){
    this.swiper?.swiperRef?.slideNext();
  }

  onSlideChange(event: any){
    this.currentSlideIndex = event[0].activeIndex;
    const temp = document.getElementById('test');
    if(temp){
      temp.hidden = !temp?.hidden;
    }
    console.log(event[0]);
  }

}
