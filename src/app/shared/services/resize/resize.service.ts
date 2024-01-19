import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  private isSmallScreen = new BehaviorSubject<boolean>(window.innerWidth < 700);
  readonly isSmallScreen$ = this.isSmallScreen.asObservable();

  constructor(private ngZone: NgZone) {}

  checkScreenSize(width: number): void {
    window.onresize = () => {
      this.ngZone.run(() => {
        this.isSmallScreen.next(window.innerWidth < width);
      });
    };
    this.ngZone.run(() => {
      this.isSmallScreen.next(window.innerWidth < width);
    });
  }

}
