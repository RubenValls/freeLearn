import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
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
      this.user = JSON.parse(localUser); // Convierte la cadena a objeto
    } else if (sessionUser) {
      this.user = JSON.parse(sessionUser); // Convierte la cadena a objeto
    }
  }
  
}
