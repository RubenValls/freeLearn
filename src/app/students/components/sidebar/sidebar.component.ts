import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSmallScreen: boolean = false;
  smallScreenSubscription: Subscription | undefined

  constructor( private router: Router, private resizeService: ResizeService, private alertMessage: AlertsService ){}

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
    const userInfoString = localStorage.getItem("userInfo");
    let user
    if (userInfoString) {
       user = JSON.parse(userInfoString);
    }
    this.callAlertMessage("See you soon: " + user?.email)
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }

  public callAlertMessage(message: string) {
    this.alertMessage.successMessage(message);
  }
}
