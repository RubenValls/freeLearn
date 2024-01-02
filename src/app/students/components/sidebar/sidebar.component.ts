import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSmallScreen: boolean = false;
  smallScreenSubscription: Subscription | undefined

  constructor( private router: Router, private resizeService: ResizeService ){}

  ngOnInit(): void {
    this.resizeService.checkScreenSize(500);
    this.smallScreenSubscription = this.resizeService.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreen = isSmallScreen;
    });
  }

  ngOnDestroy(): void {
    this.smallScreenSubscription?.unsubscribe()
  }

  handleLogOut(){
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }
}
