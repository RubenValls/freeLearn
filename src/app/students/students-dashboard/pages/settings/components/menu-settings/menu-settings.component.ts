import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/login/types/user';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss']
})
export class MenuSettingsComponent implements OnInit{

  user: User | undefined

  constructor(private router: Router, private alertMessage : AlertsService){

  }

  ngOnInit(): void {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      this.user = JSON.parse(userInfoString);
    }
  }

  handleLogOut(){
    this.alertMessage.successMessage("See you soon: " + this.user?.email)
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }


}
