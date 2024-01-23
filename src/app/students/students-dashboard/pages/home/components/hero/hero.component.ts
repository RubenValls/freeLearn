import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/login/types/user';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  user: User | undefined;

  ngOnInit(): void {
    this.getUserLogged()
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
