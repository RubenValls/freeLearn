import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss']
})
export class MenuSettingsComponent {

  constructor(private router: Router){

  }

  handleLogOut(){
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }


}
