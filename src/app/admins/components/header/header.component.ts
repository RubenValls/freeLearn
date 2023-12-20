import { Component, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSmallScreen = false;

  constructor(private ngZone: NgZone, private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.ngZone.run(() => {
      this.isSmallScreen = window.innerWidth < 650;
    });
  }

  handleLogOut(){
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }
}
