import { Component, Input } from '@angular/core';

const getStyles = (...args: string[]) => ["button", ...args].filter(Boolean)


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label!: string; 
  @Input() routerLink!: string;
  @Input() primary = false;
  @Input() type: 'primary' | 'secondary' |  'gradient'  |  'info' |  'danger' |  'warning' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'large';


  public get classes(): string[] {
    return getStyles(this.type, this.size);   
  }
}
