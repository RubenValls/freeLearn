import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSmallScreen = false;

  constructor(private ngZone: NgZone, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.ngZone.run(() => {
      this.isSmallScreen = window.innerWidth < 700;
    });
  }

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.isSmallScreen = window.innerWidth < 700;
    });
  }

  handleLogOut(){
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }
}
