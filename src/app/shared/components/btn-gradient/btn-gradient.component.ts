import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-gradient',
  templateUrl: './btn-gradient.component.html',
  styleUrls: ['./btn-gradient.component.scss']
})
export class BtnGradientComponent {
  @Input() buttonText!: string; 
  @Input() routerLink!: string;

}
