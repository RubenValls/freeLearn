import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-black',
  templateUrl: './btn-black.component.html',
  styleUrls: ['./btn-black.component.scss']
})
export class BtnBlackComponent {
  @Input() buttonText!: string; 
  @Input() routerLink!: string;

}
