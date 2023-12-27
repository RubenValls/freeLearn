import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSmallScreen: boolean = false;

  constructor( private router: Router, private resizeService: ResizeService ){}

  ngOnInit(): void {
    this.resizeService.checkScreenSize(500);
    this.resizeService.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreen = isSmallScreen;
    });
  }

  handleLogOut(){
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo')
    this.router.navigate(['/login'])
  }
}
