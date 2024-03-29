import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() type: 'primary' | 'secondary' |  'gradient'  | 'softgradient' | 'light' | 'info' |  'danger' |  'warning'  | 'close' | 'success'= 'primary';
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' = 'small'
  @Input() iconName?: string;
  @Input() iconPosition: 'start' | 'end' = 'end';
  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return getStyles(this.type, this.size);   
  }

}
