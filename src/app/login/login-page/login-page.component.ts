import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  
  isLogIn = true;

  constructor( private router: Router ){}

  onChange(event: MatButtonToggleChange) {
    if(event.value === 'login'){
      this.isLogIn = true;
    }else{
      this.isLogIn = false;
    }
  }

  onHandleBack(){
    this.router.navigate(['/'])
  }
}
