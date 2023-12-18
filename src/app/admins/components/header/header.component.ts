import { Component, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSmallScreen = false;

  constructor(private ngZone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.ngZone.run(() => {
      this.isSmallScreen = window.innerWidth < 650;
    });
  }
}
