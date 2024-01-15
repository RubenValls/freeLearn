import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.getUserLogged()
    console.log(this.user);
  }

  getUserLogged() {
    const localUser = localStorage.getItem('userInfo');
    const sessionUser = sessionStorage.getItem('userInfo');
  
    if (localUser) {
      this.user = JSON.parse(localUser); 
    } else if (sessionUser) {
      this.user = JSON.parse(sessionUser); 
    }
  }
  
}
